# Copyright 2022 Synchronous Technologies Pte Ltd
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

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

ADD ikura.graphql .
ADD ikura-prod.graphql .
ADD ikura.zefops.py .

RUN pip3 install zef==v0.15.7a7

# pip install stuff
ADD requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 5001

ENTRYPOINT ["python3", "-mzef.gql.simplegql", "--port", "5001", "--create", "--schema-file", "ikura-prod.graphql", "--hooks", "ikura.zefops.py", "--data-tag", "ikura-production"]
