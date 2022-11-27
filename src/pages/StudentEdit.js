import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getItem, getCurrentData, putItem } from "../slice/StudentSlice";

import Spinner from "../components/Spinner";
import ErrorView from "../components/ErrorView";
import TableEx from "../components/TableEx";

import dayjs from "dayjs";

const StudentEdit = memo(() => {
  /** path 파라미터 받기 */
  const { id } = useParams();

  /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.StudentSlice);

  /** 데이터 가져오기 */
  useEffect(() => {
    dispatch(getCurrentData());
  }, []);

  /** data값의 변경에 따른 사이드 이펙트 처리 */
  const item = useMemo(() => {
    if (data) {
      return data.find((v, i) => v.id == id);
    } else {
      // 새로 고침 시 현재 데이터만 다시 로드함
      dispatch(getItem({ id: id }));
    }
  }, [data]);

  /** 페이지 강제 이동 처리를 위한 navigate 함수 생성 */
  const navigate = useNavigate();

  /** <form>의 submit 버튼이 눌러졌을 때 호출할 이벤트 핸들러 */
  const onStudentSubmit = useCallback((e) => {
    e.preventDefault();

    // 이벤트가 발생한 폼 객체
    const current = e.target;

    // 리덕스를 통한 데이터 수정 요청
    dispatch(
      putItem({
        id: current.id.value,
        name: current.name.value,
        userid: current.userid.value,
        grade: current.grade.value,
        idnum: current.idnum.value,
        birthdate: current.birthdate.value,
        tel: current.tel.value,
        height: current.height.value,
        weight: current.weight.value,
        deptno: current.deptno.value,
        profno: current.profno.value,
      })).then((result) => {
        console.log(result);

        // 처리 완료 시 상세 페이지로 이동
        navigate(`/student_view/${result.payload.id}`);
      });
  },[]);

  return (
    <div>
      {/* 로딩바 */}
      <Spinner loading={loading} />

      {error ? (
        <ErrorView error={error} />
      ) : (
        <form onSubmit={onStudentSubmit}>
          <input type="hidden" name="id" defaultValue={item?.id} />
          <TableEx>
            <colgroup>
              <col width="120" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>이름</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="name"
                    defaultValue={item?.name}
                  />
                </td>
              </tr>
              <tr>
                <th>아이디</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="userid"
                    defaultValue={item?.userid}
                  />
                </td>
              </tr>
              <tr>
                <th>학년</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="grade"
                    defaultValue={item?.grade}
                  />
                </td>
              </tr>
              <tr>
                <th>주민번호</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="idnum"
                    defaultValue={item?.idnum}
                  />
                </td>
              </tr>
              <tr>
                <th>생년월일</th>
                <td className="inputWrapper">
                  <input
                    type="date"
                    className="field"
                    name="birthdate"
                    defaultValue={item?.birthdate}
                  />
                </td>
              </tr>
              <tr>
                <th>연락처</th>
                <td className="inputWrapper">
                  <input
                    type="tel"
                    className="field"
                    name="tel"
                    defaultValue={item?.tel}
                  />
                </td>
              </tr>
              <tr>
                <th>키</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="height"
                    defaultValue={item?.height}
                  />
                </td>
              </tr>
              <tr>
                <th>몸무게</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="weight"
                    defaultValue={item?.weight}
                  />
                </td>
              </tr>
              <tr>
                <th>학과번호</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="deptno"
                    defaultValue={item?.deptno}
                  />
                </td>
              </tr>
              <tr>
                <th>교수번호</th>
                <td className="inputWrapper">
                  <input
                    type="text"
                    className="field"
                    name="profno"
                    defaultValue={item?.profno}
                  />
                </td>
              </tr>
            </tbody>
          </TableEx>

          <div style={{ textAlign: "center" }}>
            <button type="submit">저장하기</button>
          </div>
        </form>
      )}
    </div>
  );
});

export default StudentEdit;
