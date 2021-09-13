import {
  Menu,
  Button,
  Radio,
  Checkbox,
  Switch,
  Select,
  Breadcrumb,
  Tooltip,
  Dropdown,
  Empty,
  message
} from 'ant-design-vue';

const autUi = {
  install:(app) => {
    app.use(Menu);
    app.use(Button);
    app.use(Radio);
    app.use(Checkbox);
    app.use(Switch);
    app.use(Select);
    app.use(Breadcrumb);
    app.use(Tooltip);
    app.use(Dropdown);
    app.use(Empty);

    app.config.globalProperties.$message = message;
  
    return app
  }
}

export default autUi
