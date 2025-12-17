#!/bin/bash

# 에러 발생 시 즉시 중단
set -e

# 1. 커밋 메시지 입력받기 (없으면 기본값 설정)
COMMIT_MSG="${1:-Update: Boilerplate synchronization}"
TEMP_BRANCH="release-temp-$(date +%s)"

echo "🚀 Public 레포지토리 배포를 시작합니다..."
echo "📝 커밋 메시지: $COMMIT_MSG"

# 2. 현재 브랜치 이름 저장 (나중에 돌아오기 위함)
CURRENT_BRANCH=$(git branch --show-current)

# 3. 족보 없는(Orphan) 임시 브랜치 생성
echo "🌱 임시 브랜치($TEMP_BRANCH) 생성 중..."
git checkout --orphan $TEMP_BRANCH

# 4. 파일 스테이징 및 커밋
git add .
git commit -m "$COMMIT_MSG"

# 5. Public 리모트로 강제 푸시
echo "ea4 배포(Push) 진행 중..."
git push public $TEMP_BRANCH:main --force

# 6. 정리 (원래 브랜치로 복귀 및 임시 브랜치 삭제)
echo "🧹 정리 중..."
git checkout $CURRENT_BRANCH
git branch -D $TEMP_BRANCH

echo "✅ 배포 완료! (Public 레포지토리가 업데이트되었습니다)"