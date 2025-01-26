import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Input, Radio } from "antd";
import { DatePicker } from "antd";
import { useMediaQuery } from "react-responsive";

export const TextInput = styled(Input)``;

export const PasswordInput = styled(Input.Password)``;

export const DateInput = styled(DatePicker)`
  width: 100%;
`;

export const RadioInput = (props) => {
  const { options, onChange } = props;
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  const [item, setItem] = useState(options[0].value);

  useEffect(() => {
    // 초기값 설정
    if (options.length === 0) return;

    setItem(options[0].value);
  }, [options]);
  useEffect(() => {
    onChange(item);
  }, [item]);

  return (
    <Radio.Group
      size="large"
      style={{ width: "100%" }}
      defaultValue={options[0].value}
      onChange={(e) => setItem(e.target.value)}
      value={item}
    >
      {options?.map(({ label, value }, index) => (
        <Radio.Button
          style={{
            width:
              isMobile && options.length > 2
                ? `${(100 / options.length) * 2}%`
                : `${100 / options.length}%`,
            textAlign: "center",
            backgroundColor: `${
              item === value ? "var(--bg-primary)" : "var(--bg-body)"
            }`,
          }}
          key={value}
          name={value}
          value={value}
        >
          {label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
