module.exports = {
  apps: [
    {
      name: 'meta-automation',
      script: '/usr/bin/php8.4',
      args: 'artisan serve --host=0.0.0.0 --port=5053',
      cwd: '/home/agent-pyris/projects/meta-automation',
      env: {
        PORT: '5053',
        APP_ENV: 'production',
        APP_DEBUG: 'false',
        WEBHOOK_URL: 'http://metos.site:5053'
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-error.log',
      out_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-out.log',
      log_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-combined.log',
      time: true,
    },
    {
      name: 'meta-automation-queue',
      script: '/usr/bin/php8.4',
      args: 'artisan queue:work --queue=ai,default,automations,social-facebook,social-x,social-linkedin,social-linkedin-page,social-instagram,social-instagram-facebook,social-tiktok,social-youtube,social-threads,social-pinterest,social-bluesky,social-mastodon,social-telegram,social-discord,posts --tries=3 --timeout=600 --sleep=3 --retry-delay=10',
      cwd: '/home/agent-pyris/projects/meta-automation',
      instances: 2,
      exec_mode: 'fork',
      env: {
        PORT: '5053',
        APP_ENV: 'production',
        APP_DEBUG: 'false',
        WEBHOOK_URL: 'http://metos.site:5053'
      },
      watch: false,
      max_memory_restart: '500M',
      error_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-queue-error.log',
      out_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-queue-out.log',
      log_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-queue-combined.log',
      time: true,
    },
    {
      name: 'meta-automation-reverb',
      script: '/usr/bin/php8.4',
      args: 'artisan reverb:start --host=0.0.0.0 --port=8080',
      cwd: '/home/agent-pyris/projects/meta-automation',
      env: {
        PORT: '8080',
        APP_ENV: 'production',
        APP_DEBUG: 'false',
        WEBHOOK_URL: 'http://metos.site:5053'
      },
      watch: false,
      max_memory_restart: '256M',
      error_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-reverb-error.log',
      out_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-reverb-out.log',
      log_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-reverb-combined.log',
      time: true,
    },
    {
      name: 'meta-automation-scheduler',
      script: '/usr/bin/php8.4',
      args: 'artisan schedule:work',
      cwd: '/home/agent-pyris/projects/meta-automation',
      env: {
        PORT: '5053',
        APP_ENV: 'production',
        APP_DEBUG: 'false',
        WEBHOOK_URL: 'http://metos.site:5053'
      },
      watch: false,
      max_memory_restart: '256M',
      error_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-scheduler-error.log',
      out_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-scheduler-out.log',
      log_file: '/home/agent-pyris/projects/meta-automation/storage/logs/pm2-scheduler-combined.log',
      time: true,
    }
  ]
};