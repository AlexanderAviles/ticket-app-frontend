import React, { useEffect, useState } from "react";

import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {  useNavigate, redirect, Navigate } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import { getusuarioStorage } from "../helpers/getUsuerioStorage";
import { EscritorioPage } from "./Escritorio";

const { Title, Text } = Typography;


export const IngresarPage = () => {

  const [usuario] = useState(getusuarioStorage());
  const navigate  = useNavigate();

  const onFinish = ({ agente, escritorio}) => {
    localStorage.setItem('agente', agente);
    localStorage.setItem('escritorio', escritorio);
    navigate('/escritorio');
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useHideMenu(false);

  if(usuario.agente && usuario.escritorio){
    return <Navigate to='/escritorio'/>
 }
  return (
    <>
    <Title level={2}>Ingresar</Title>
    <Text>Ingrese su nombre y número de escritorio</Text>
    <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su nombre!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: "Ingrese el numero de escritorio",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
