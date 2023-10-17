function Divider() {
  const dividerStyle = {
    height: "2.75rem",
    width: "100%",
    background: "linear-gradient(to bottom, #C0C0C0 0%, #DCDCDC 100%)", // 그라데이션 설정
    marginBottom: "2rem",
    border: "1px solid #BEBEBE",
  };
  return <div style={dividerStyle}></div>;
}

export default Divider;
