import { FC, ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  children: ReactNode;
  classes?: string;
  offset?: any;
}

const Index: FC<Props> = ({ children, classes, offset }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: offset || ['end 0.9', 'start 0.9'],
    smooth: 0,
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <motion.div className={classes} ref={container} style={{ opacity }}>
      {children}
    </motion.div>
  );
};
export default Index;
