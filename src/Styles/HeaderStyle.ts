import { motion } from "framer-motion";
import styled from "styled-components";

export const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 60px;
  font-size: 14px;
  color: white;
`;

export const Col = styled.div`
  display: flex;
  align-items: center;
`;

export const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

export const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

export const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

export const Search = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  svg {
    height: 25px;
    cursor: pointer;
  }
`;

export const Input = styled(motion.input)`
  position: absolute;
  right: 0;
  z-index: -1;
  width: 214px;
  padding: 8px 0 8px 40px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
  transform-origin: right center;
  color: white;
  font-size: 16px;
`;
