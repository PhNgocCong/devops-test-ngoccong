pipeline {
    agent any

    environment {
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
        TELEGRAM_BOT_TOKEN = credentials('TELEGRAM_BOT_TOKEN')
        TELEGRAM_CHAT_ID = credentials('TELEGRAM_CHAT_ID')
        REPO_NAME = "devops-test-ngoccong" 
        VERCEL_PROJECT_NAME = "gioi-thieu-ngoccong" // Tên viết thường để sửa lỗi Vercel
        BRANCH_NAME = "main"
    }

    stages {
        stage('Thông báo: Bắt đầu') {
            steps {
                script {
                    def commitMsg = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    sh """
                        curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
                        -d "chat_id=${TELEGRAM_CHAT_ID}" \
                        -d "text=🚀 Bắt đầu deploy website%0ARepository: ${REPO_NAME}%0ABranch: ${BRANCH_NAME}%0ACommit: ${commitMsg}"
                    """
                }
            }
        }

        stage('Checkout & Build') {
            steps {
                // Jenkins tự động checkout code từ GitHub
                checkout scm
                
                // Nếu dự án của bạn CÓ dùng Node.js/React thì xóa dấu // ở 2 dòng dưới. 
                // Nếu chỉ là HTML/CSS thuần thì cứ để nguyên dấu // như thế này.
                // sh 'npm install'
                // sh 'npm run build'
            }
        }

        stage('Deploy to Vercel') {
            steps {
                script {
                    // Thêm tham số --name để ép tên project thành chữ thường, khắc phục lỗi Vercel
                    sh 'npx vercel --token ${VERCEL_TOKEN} --prod --yes --name ${VERCEL_PROJECT_NAME}'
                }
            }
        }
    }

    post {
        success {
            script {
                sh """
                    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
                    -d "chat_id=${TELEGRAM_CHAT_ID}" \
                    -d "text=✅ Deploy thành công%0ARepository: ${REPO_NAME}%0ABranch: ${BRANCH_NAME}%0AWebsite: https://gioi-thieu-ban-than-six.vercel.app"
                """
            }
        }
        failure {
            script {
                def commitMsg = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                sh """
                    curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
                    -d "chat_id=${TELEGRAM_CHAT_ID}" \
                    -d "text=❌ Deploy thất bại%0ARepository: ${REPO_NAME}%0ABranch: ${BRANCH_NAME}%0ACommit: ${commitMsg}%0AError: Kiểm tra log Jenkins để biết chi tiết."
                """
            }
        }
    }
}