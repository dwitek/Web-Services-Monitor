from ping.models import PingConfiguration, PingResults
from .email import ping_send_email
from .scheduler import get_scheduler
from pythonping import ping

scheduler = get_scheduler()


def ping_job(ping_configuration):
    try:
        response_list = ping(target=ping_configuration.ip, count=ping_configuration.number_of_requests,
                             timeout=ping_configuration.timeout)

        error_messages = []
        for response in response_list:
            if not response.success:
                error_messages.append(response)

        PingResults.objects.create(ping_configuration=ping_configuration,
                                   number_of_requests=ping_configuration.number_of_requests,
                                   rtt_avg_ms=response_list.rtt_avg_ms,
                                   error_messages=error_messages)

        email_job_id = "ping_email_" + str(ping_configuration.id)
        if error_messages:
            if not scheduler.job_exists(email_job_id):
                ping_send_email(ping_configuration, error_messages)
                scheduler.add_job(job=ping_send_email, interval=3600, args=(ping_configuration, error_messages,),
                                  job_id=email_job_id)
        else:
            if scheduler.job_exists(email_job_id):
                scheduler.remove_job(job_id=email_job_id)
    except TypeError:
        print("Ping job duplication was prevented.")


def start():
    ping_configurations = PingConfiguration.objects.all()
    for ping_configuration in ping_configurations:
        job_id = "ping_" + str(ping_configuration.id)
        if ping_configuration.is_active:
            scheduler.add_job(job=ping_job, interval=ping_configuration.interval, args=(ping_configuration,),
                              job_id=job_id)
        else:
            if scheduler.job_exists(job_id=job_id):
                scheduler.remove_job(job_id=job_id)


def add_or_update(ping_configuration):
    job_id = "ping_" + str(ping_configuration.id)
    if ping_configuration.is_active:
        scheduler.add_job(job=ping_job, interval=ping_configuration.interval, args=(ping_configuration,), job_id=job_id)
    else:
        if scheduler.job_exists(job_id=job_id):
            scheduler.remove_job(job_id=job_id)


def remove(ping_configuration_id):
    job_id = "ping_" + str(ping_configuration_id)
    if scheduler.job_exists(job_id=job_id):
        scheduler.remove_job(job_id=job_id)
