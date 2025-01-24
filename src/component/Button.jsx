import { Button } from "antd";
import styled from "styled-components";

export const PrimaryButton = styled(Button)`
  background-color: var(--fg-primary);
  color: var(--text-dark);
  font-weight: bold;
  border: 1px solid var(--fg-primary);
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
`;

export const SecondaryButton = styled(Button)`
  color: var(--text-secondary);
  font-weight: bold;
  border: 1px solid var(--border-disable);
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
`;

export const DarkButton = styled(Button)`
  background-color: var(--text-light);
  color: var(--text-dark);
  font-weight: bold;
  border: 1px solid var(--border-disable);
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease;
`;
