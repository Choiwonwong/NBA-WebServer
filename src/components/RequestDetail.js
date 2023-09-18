// // src/components/RequestDetail.js

// import React from 'react';
// import { useParams } from 'react-router-dom';

// function RequestDetail() {
//   // URL 매개변수를 사용하여 요청 ID를 가져옵니다.
//   const { id } = useParams();

//   // 요청 목록 데이터에서 해당 요청을 찾습니다.
//   const requestItem = requestListData.find((item) => item.id === parseInt(id));

//   return (
//     <div>
//       <h2>요청 상세 정보</h2>
//       {requestItem ? (
//         <div>
//           <h3>{requestItem.title}</h3>
//           {/* 요청 내용을 여기에 표시할 수 있습니다. */}
//         </div>
//       ) : (
//         <p>요청을 찾을 수 없습니다.</p>
//       )}
//     </div>
//   );
// }

// export default RequestDetail;
