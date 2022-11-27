import React, { memo, useEffect, useMemo, useCallback } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getItem, getCurrentData, deleteItem } from "../slice/StudentSlice";

import Spinner from "../components/Spinner";
import ErrorView from "../components/ErrorView";
import Table from "../components/Table";

import dayjs from "dayjs";

const StudentView = memo(() => {
  /** path 파라미터 받기 */
  const { id } = useParams();

  /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.StudentSlice);

  /** 데이터 가져오기 */
  useEffect(() => {
    dispatch(getCurrentData());
  }, []);

  console.log(data);

  /** data값의 변경에 따른 사이드 이펙트 처리 */
  const item = useMemo(() => {
    if (data) {
      return data.find((v, i) => v.id == id);
    } else {
      // 새로 고침 시 현재 데이터만 다시 로드
      dispatch(getItem({ id: id }));
    }
  }, [data]);

  console.log(item);

  /** 페이지 강제이동 처리를 위한 navigate 함수 생성 */
  const navigate = useNavigate();

  /** 삭제 버튼에 대한 이벤트 리스너 */
  const onStudentItemDelete = useCallback((e) => {
    e.preventDefault();

    const current = e.target;
    const { id, name } = current.dataset;

    if (window.confirm(`정말 ${name}을 삭제하시겠습니까?`)) {
      dispatch(deleteItem({ id: id })).then(({ meta, payload }) => {
        // 삭제 후 목록페이지로 이동
        navigate("/");
      });
    }
  }, []);

  return (
    <div>
      {/* 로딩바 */}
      <Spinner loading={loading} />

      {error ? (
        <ErrorView error={error} />
      ) : (
        item && (
          <div>
            <Table>
              <colgroup>
                <col width="120" />
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>No</th>
                  <td>{item.id}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <th>아이디</th>
                  <td>{item.userid}</td>
                </tr>
                <tr>
                  <th>학년</th>
                  <td>{item.grade}</td>
                </tr>
                <tr>
                  <th>주민번호</th>
                  <td>{item.idnum}</td>
                </tr>
                <tr>
                  <th>생년월일</th>
                  <td>
                    {item.birthdate
                      ? dayjs(item.birthdate).format("YY-MM-DD")
                      : ""}
                  </td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>{item.tel}</td>
                </tr>
                <tr>
                  <th>키</th>
                  <td>{item.height}</td>
                </tr>
                <tr>
                  <th>몸무게</th>
                  <td>{item.weight}</td>
                </tr>
                <tr>
                  <th>학과번호</th>
                  <td>{item.deptno}</td>
                </tr>
                <tr>
                  <th>교수번호</th>
                  <td>{item.profno}</td>
                </tr>
              </tbody>
            </Table>

            <div style={{ textAlign: "center ", padding: "10px" }}>
              <NavLink to="/">목록</NavLink>
              &nbsp; | &nbsp;
              <NavLink to="/student_add">등록</NavLink>
              &nbsp; | &nbsp;
              <NavLink to={`/student_edit/${item.id}`}>수정</NavLink>
              &nbsp; | &nbsp;
              <NavLink to="#!" data-id={item.id} data-name={item.name} onClick={onStudentItemDelete}>삭제</NavLink>
            </div>
          </div>
        )
      )}
    </div>
  );
});

export default StudentView;
