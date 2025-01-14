import React, { CSSProperties } from "react";
import styles from "./SectionCol.module.css";

interface SectionColProps {
  titleRef?: React.Ref<HTMLParagraphElement>;
  leftRef?: React.Ref<HTMLParagraphElement>; // Ref for left paragraph
  rightRef?: React.Ref<HTMLParagraphElement>; // Ref for right paragraph
  titleStyle : string; //CSSProperties
  leftStyle : string;  //CSSProperties
  rightStyle : string; //CSSProperties
  title: string; // Tiêu đề lớn
  leftContent: string; // Nội dung cột trái
  rightContent: string; // Nội dung cột phải
}

const SectionCol: React.FC<SectionColProps> = 
    ({titleRef = null, leftRef = null, rightRef = null, 
      titleStyle = "", leftStyle = null, rightStyle = null, 
      title, leftContent, rightContent }) => {
  return (
    <section className={styles.section}>
      {/* Tiêu đề lớn */}
      <h1 ref={titleRef} className={`${styles.header} ${titleStyle}`}>{title}</h1>

      {/* Nội dung 2 cột */}
      <div className={styles.columns}>
        {/* Cột bên trái */}
        <div className={styles.column}>
          <p ref = {leftRef} className={`${leftStyle}`}>{leftContent}</p>
        </div>

        {/* Cột bên phải */}
        <div className={styles.column}>
          <p ref = {rightRef} className={`${rightStyle}`}>{rightContent}</p>
        </div>
      </div>
    </section>
  );
};

export default SectionCol;
