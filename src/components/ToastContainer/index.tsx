import React from 'react';
import  { useTransition }  from 'react-spring';

import Toast from './Toast';

import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
  });

  if (!messages.length) return null;

  return (
    <Container>
      {messagesWithTransitions((props, item) => (
        <Toast key={item.id} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;