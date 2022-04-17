FROM python:3.10-slim

ENV APP_PATH=/usr/src/app
WORKDIR $APP_PATH

RUN apt-get update

RUN apt install -y jq

RUN apt-get update

RUN apt-get install -y --no-install-recommends \
  golang \
  ca-certificates \
  locales \
  fonts-liberation \
  build-essential \
  wget \
  cmake \
  bzip2 \
  curl \
  unzip \
  git \
  gfortran \
  perl \
  patchelf \
  cgroup-tools \
  jq \
  zstd \
  libzstd-dev \
  openssl \
  libssl-dev \
  libsecret-1-0 \
  libcurl4-openssl-dev
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && locale-gen

RUN ln -fs /usr/share/zoneinfo/Asia/Singapore /etc/localtime

RUN git config --global --add credential.helper 'store --file=/run/secrets/gitcredentials' \
  && git config --global url."https://github.com/".insteadOf git@github.com:

COPY get_zefdb.sh .
ADD ikura.graphql .

RUN --mount=type=secret,id=gitcredentials bash get_zefdb.sh zef v0.15.3-dev2 'zef-.*cp310'

# pip install stuff
ADD requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 5001

ENTRYPOINT ["python3", "-mzef.gql.simplegql", "--port", "5001", "--create", "ikura.graphql", "ikura-production"]
