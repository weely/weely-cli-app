import {
  Button,
  message
} from 'ant-design-vue';

const autUi = {
  install:(app) => {
    app.use(Button);

    app.config.globalProperties.$message = message;
  
    return app
  }
}

export default autUi
