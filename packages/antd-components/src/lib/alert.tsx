import React from 'react';
import nx from '@jswork/next';
import { Input, InputProps, Modal } from 'antd';

declare global {
  interface NxStatic {
    alert: typeof alert;
    confirm: typeof confirm;
    prompt: typeof prompt;
  }
}

export const alert = (inMessage: string, inTitle?: String) => {
  return Modal.info({
    title: inTitle || 'Tips',
    content: inMessage
  });
};

export const confirm = (inMessage: string, inTitle?: String) => {
  return new Promise((resolve) => {
    Modal.confirm({
      title: inTitle || 'Confirm',
      content: inMessage,
      onOk: () => resolve(true),
      onCancel: () => resolve(false)
    });
  });
};

export const prompt = (inMessage: string, inOptions?: InputProps) => {
  let value = '';
  return new Promise((resolve) => {
    Modal.confirm({
      title: inMessage || 'Prompt',
      content: (
        <Input
          type="text"
          placeholder={inMessage}
          defaultValue={value}
          onChange={(e) => (value = e.target.value)}
          {...inOptions}
        />
      ),
      onOk: () => resolve(value),
      onCancel: () => resolve(null)
    });
  });
};

nx.alert = alert;
nx.confirm = confirm;
nx.prompt = prompt;
