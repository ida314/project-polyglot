# project polyglot (langauge tutor)

## Contents:

[TODO](#TODO)

## TODO:

### Database Integration:
- Replace JSON file storage with SQLite or PostgreSQL
- Add proper database migrations

### Enhanced Features:
- Implement the Whisper speech-to-text placeholder
- Add spaced repetition algorithm for review sessions
- Create more sophisticated mistake detection

### Production Deployment:
- Add proper error handling and logging
- Implement rate limiting
- Add monitoring and analytics
- Configure production OAuth callbacks

### Testing:
- Add unit tests for backend services
- Add React component tests
- Add integration tests for API endpoints


## Development
- Clone repo
- Settup enviorment variables
- run $ docker-compose up --build
- access app at htp://localhost:3000

## Notes

### Deploy to EC2

 SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

 Install Docker and Docker Compose
sudo yum update -y
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

 Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

 Clone your repository
git clone https://github.com/YOUR_USERNAME/project-polyglot.git
cd project-polyglot

 Create .env file with production values
nano .env

 Run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d