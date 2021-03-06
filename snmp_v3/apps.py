import os

from django.apps import AppConfig


class SnmpV3Config(AppConfig):
    name = 'snmp_v3'

    def ready(self):
        from scheduler import snmp_v3_api
        if os.environ.get('RUN_MAIN', None) != 'true':
            snmp_v3_api.start()
