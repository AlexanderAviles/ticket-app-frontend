import React, { useContext, useState } from "react";
import { Col, Row, Typography, Button, Divider } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { getusuarioStorage } from "../helpers/getUsuerioStorage";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const {Title, Text} = Typography;
export const EscritorioPage = () => {

  const [usuario] = useState(getusuarioStorage());
  const navigate  = useNavigate();
  const { socket } = useContext( SocketContext );
  const [ticket, setTicket] = useState(null)
  useHideMenu(false);

  const salir = () => {
    console.log('Salir');
    localStorage.clear();
    navigate('/ingresar', {replace: true})
  }
  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajador', usuario, (ticket) => {
      setTicket(ticket);
    });
  }

  if(!usuario.agente && !usuario.escritorio){
    return <Navigate to='/ingresar'/>
 }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title>{usuario.agente}</Title>
          <Text>Usted está trabajando en el escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4} align="right">
          <Button
          shape="round"
          type="primary"
          danger
          onClick={ salir }

          >
            <CloseCircleOutlined/>
            Salir
          </Button>
        </Col>
        
      </Row>
      <Divider />

{
  ticket && (
    <Row>
    <Col>
      <Text>Está atendiendo el ticket número:</Text>
      <Text style={{ fontSize: 30}} type="danger"> {ticket.numero}</Text>
    </Col>
  </Row>
  )
}

      <Row>
        <Col offset={18} span={6} align="right">
          <Button
            onClick={ siguienteTicket }
            shape="round"
            type="primary"
          >
            <RightOutlined />
            Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};
