#!/bin/bash

launchScript='
#!/bin/bash -e
# TODO: All requested environment variables should be declared dynamically.
export PATH={{=service.env.PATH}}
export PORT={{=service.env.PORT}}
export TCP_PORT={{=service.env.TCP_PORT}}
cd {{=service.env.PIO_SERVICE_PATH}}/live/install
export PIO_SERVICE_DATA_BASE_PATH={{=service.env.PIO_SERVICE_DATA_BASE_PATH}}
cd server
npm run-script run >> {{=service.env.PIO_SERVICE_LOG_BASE_PATH}}.log 2>&1
'
echo "$launchScript" | sudo tee $PIO_SCRIPTS_PATH/_launch.sh
sudo chmod ug+x $PIO_SCRIPTS_PATH/_launch.sh


initScript='
description "{{=service.env.PIO_SERVICE_ID_SAFE}}"

start on local-filesystems
stop on shutdown

script
    echo $$ > {{=service.env.PIO_SERVICE_RUN_BASE_PATH}}.pid
    exec /opt/services/pio.server/packages/mon/mon --mon-pidfile "'$PIO_SERVICE_RUN_BASE_PATH'.pid" '$PIO_SCRIPTS_PATH'/_launch.sh  >> '$PIO_SERVICE_LOG_BASE_PATH'.launch.log 2>&1 
end script

pre-start script
    echo "\\n\\n['`date -u +%Y-%m-%dT%T.%3NZ`'] (/etc/init/app-{{=service.env.PIO_SERVICE_ID_SAFE}}.conf) ########## STARTING ##########\\n" >> {{=service.env.PIO_SERVICE_LOG_BASE_PATH}}.log
end script

pre-stop script
    kill `cat {{=service.env.PIO_SERVICE_RUN_BASE_PATH}}.pid`; rm -f {{=service.env.PIO_SERVICE_RUN_BASE_PATH}}.pid
    echo "\\n['`date -u +%Y-%m-%dT%T.%3NZ`'] (/etc/init/app-{{=service.env.PIO_SERVICE_ID_SAFE}}.conf) ^^^^^^^^^^ STOPPING ^^^^^^^^^^\\n\\n" >> {{=service.env.PIO_SERVICE_LOG_BASE_PATH}}.log
end script
'
if [ -f "/etc/init/app-$PIO_SERVICE_ID_SAFE.conf" ]; then
    sudo stop app-$PIO_SERVICE_ID_SAFE || true
fi
echo "$initScript" | sudo tee /etc/init/app-$PIO_SERVICE_ID_SAFE.conf
sudo start app-$PIO_SERVICE_ID_SAFE
