    uploadApi(data){
      const reader = new FileReader()
      const formData = new FormData()
      reader.onload = (e) => {
        const dataTarget = e.target.result
        formData.append('content', dataTarget)
        const params = {
          data: formData
        }
        BatchModifyUserPhonePlateApi(params).then((res) => {
          if (res && +res.errcode === 0) {
            this.$message({
              type: 'success',
              message: '上传成功',
              showClose: true
            })
            this.calc && this.calc()
          } else {
            this.$message({
              type: 'error',
              message: `上传失败（错误信息：${res.msg || ''}）`,
              showClose: true
            })
          }
        })
      }
      reader.readAsDataURL(data.file);
    },