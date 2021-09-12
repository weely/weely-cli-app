import {
  Menu,
  Button,
  Radio,
  Checkbox,
  Select,
  Breadcrumb,
  Tooltip,
  Dropdown,
  message
} from 'ant-design-vue';

const autUi = {
  install:(app) => {
    app.use(Menu);
    app.use(Button);
    app.use(Radio);
    app.use(Checkbox);
    app.use(Select);
    app.use(Breadcrumb);
    app.use(Tooltip);
    app.use(Dropdown);

    app.config.globalProperties.$message = message;
  
    return app
  }
}

export default autUi
