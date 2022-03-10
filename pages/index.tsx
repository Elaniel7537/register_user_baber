import type { NextPage } from "next";
import moment, { Moment } from "moment";
import {
  Col,
  Divider,
  Form,
  Input,
  Layout,
  Row,
  Select,
  Typography,
  Image,
  Button,
  DatePicker,
  TimePicker,
} from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Home: NextPage = () => {
  const [form] = Form.useForm();

  const disabledDate = (current: any) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  };

  const getDisabledHours = () => {
    var hours = [];
    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  const disabledTime = () => {
    return { disabledHours: () => getDisabledHours() };
  };

  const onFinish = (values: any) => {
    let date = moment(values["date"]).format("YYYY-MM-DD");
    let time = moment(values["time"]).format("HH:mm");

    console.log(date, time);
  };

  return (
    <Layout className="barber-layout">
      <Content>
        <div className="site-layout-content">
          <Row gutter={[16, 16]} align="middle" justify="center">
            {/* tutulo */}
            <Col xs={24}>
              <div className="aling-center">
                <div className="logo"></div>
                {/* <Image
                  src="/logo.png"
                  width={200}
                  preview={{
                    visible: false,
                    mask: false,
                  }}
                /> */}
              </div>

              <Divider />

              <Title level={3}>Agenda tu cita</Title>
            </Col>
          </Row>
          {/* formulario */}
          <Form
            form={form}
            name="basic_pay"
            onFinish={onFinish}
            className="filters-form mt1"
          >
            <Row gutter={[16, 16]}>
              {/* barbero */}
              <Col xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label=" Seleccione Barbero"
                  name="barber"
                  rules={[
                    {
                      required: true,
                      message: "Seleccione barbero.",
                    },
                  ]}
                >
                  <Select
                    placeholder="Seleccione barbero"
                    className="search-select-pay"
                    showArrow
                  >
                    <Option key="1" value="Jadixon">
                      Jadixon
                    </Option>
                    <Option key="2" value="Alex">
                      Alex
                    </Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* fecha */}
              <Col xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Seleccione Fecha"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: "Seleccione fecha.",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Seleccione fecha"
                    disabledDate={disabledDate}
                  />
                </Form.Item>
              </Col>

              {/* hora */}
              <Col xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Seleccione Hora"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Seleccione hora.",
                    },
                  ]}
                >
                  <TimePicker
                    placeholder="Seleccione hora"
                    format="HH"
                    disabledTime={disabledTime}
                  />
                </Form.Item>
              </Col>

              {/* nombre */}
              <Col xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Nombre"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese nombre.",
                    },
                  ]}
                >
                  <Input placeholder="nombre" />
                </Form.Item>
              </Col>

              {/* telefono */}
              <Col xs={24}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Teléfono"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese teléfono.",
                    },
                  ]}
                >
                  <Input placeholder="teléfono" />
                </Form.Item>
              </Col>

              {/* agendar */}
              <Col xs={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="btn-search"
                  >
                    Agendar
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
          
          <Divider />
        </div>
      </Content>
    </Layout>
  );
};

export default Home;
