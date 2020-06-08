### 删除分支 git branch -d WANGYANG881
### 强制删除分支 git branch -D WANGYANG881
### 回退版本 git reset --hard HEAD^
### git clean -df 强制清空工作空间
### git remote prune origin 来删除远程仓库已经删除过的分支(更新本地远程分支信息)
### git config --global core.longpaths true 文件路径太长

### git reset --soft HEAD^ （git commit之后，想撤销commit https://www.cnblogs.com/lfxiao/p/9378763.html）
### git使用情景1：正在写代码，突然线上出现了bug（https://blog.csdn.net/w958796636/article/details/53609589）
### git stash (https://www.cnblogs.com/zndxall/archive/2018/09/04/9586088.html)


### 在本地主干分支kyp_630_dev 更新代码
### 基于 本地主干分支 创建 自己的 本地开发分支
### git checkout -b WANGYANG881

### 将 自己 本地开发分支 推送到远程
### git push --set-upstream origin WANGYANG881

### 远程已存在要创建的分支，在本地创建分支同时关联远程分支
### git checkout -b WANGYANG881 origin/WANGYANG881


### 在自己本地开发分支 下开发,需要提交代码时
### 在自己本地开发分支 下，将远程主干分支merge到自己本地开发分支
### git merge origin/kyp_630_dev

### 检查是否有冲突，报错，没有先推送到自己的远程开发分支
### git add .
### git commit -m ""
### git push
### 此时自己的远程分支代码是 -----远程主干分支代码和自己新写的代码-----

### 切换到本地主干分支
### git checkout kyp_630_dev

### 先更新本地主干分支代码
### git pull

### 然后将 本地自己开发分支 代码 合并 到 本地主干分支
### git merge WANGYANG881

### 没有异常，然后推送
### git push

### 此时在回到自己的分支 git checkout WANGYANG881开发
### 1、可以选择 git merge kyp_630_dev
### 2、如果在切换到WANGYANG881时，没有选择 git merge kyp_630_dev
###    可以继续直接开发，在下次准备提交代码时，选择执行git merge origin/kyp_630_dev
###    效果一样



###2019-08-06
    提交代码需要在commit 时加上这个 PAGI-IIWPP-EST #7208 (Bug ID)
