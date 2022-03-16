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
  message,
  Image,
  Button,
  DatePicker,
  TimePicker,
} from "antd";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyDXjAc0rUWSz-wALYcDPYzdiQ4GR70HZGg",
  authDomain: "barber-24beb.firebaseapp.com",
  projectId: "barber-24beb",
  storageBucket: "barber-24beb.appspot.com",
  messagingSenderId: "526976526855",
  appId: "1:526976526855:web:aab99474e938a7d5c8d8a2",
  measurementId: "G-RX8J3XX4EV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const Home: NextPage = () => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const disabledDate = (current: any) => {
    let customDate = moment().format("YYYY-MM-DD");
    return current && current < moment(customDate, "YYYY-MM-DD");
  };

  const getDisabledHours = (current: any) => {
    let currentDate = moment().isAfter(current);

    var hours = [];
    if (currentDate) {
      for (var i = 0; i < moment().hour(); i++) {
        hours.push(i);
      }
    }
    return hours;
  };

  const disabledTime = (current: any) => {
    return { disabledHours: () => getDisabledHours(current) };
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        barber: values.barber,
        date: values.date.unix(),
        day: values.date.format("DD/MM/YYYY"),
        name: values.name,
        phone: values.phone,
        status: "pending",
      });
      setLoading(false);
      form.resetFields();
      message.success("Hora reservada");
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setLoading(false);
      message.success("Hubo un error al reservar");
      console.error("Error adding document: ", e);
    }
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
                    <Option key="1" value="8PFBdVOJx3QuU3W6k0h1lnS0dUk1">
                      Barber 1
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
                    showTime
                    format="DD/MM/YYYY HH:MM"
                    disabledDate={disabledDate}
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
                    disabled={loading}
                    loading={loading}
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
