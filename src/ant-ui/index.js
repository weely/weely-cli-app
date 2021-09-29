import {
  Menu,
  Row,
  Button,
  Form,
  Radio,
  Checkbox,
  Switch,
  Select,
  Input,
  InputNumber,
  Breadcrumb,
  Tooltip,
  Dropdown,
  Upload,
  Empty,
  message
} from 'ant-design-vue';

const autUi = {
  install:(app) => {
    app.use(Menu);
    app.use(Row);
    app.use(Form);
    app.use(Button);
    app.use(Radio);
    app.use(Checkbox);
    app.use(Switch);
    app.use(Select);
    app.use(Input);
    app.use(InputNumber);
    app.use(Breadcrumb);
    app.use(Tooltip);
    app.use(Dropdown);
    app.use(Upload);
    app.use(Empty);

    app.config.globalProperties.$message = message;
  
    return app
  }
}

export default autUi
