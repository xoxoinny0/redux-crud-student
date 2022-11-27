import React, { memo, useEffect, useCallback} from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import ErrorView from '../components/ErrorView';
import Table from '../components/Table';

import { useSelector, useDispatch } from 'react-redux';
import { getList, deleteItem } from '../slice/StudentSlice';

import styled from 'styled-components';

import dayjs from 'dayjs';

// 학생정보 추가하기 박스
const AddContainer = styled.form`
    position: sticky;
    top: 0;
    background-color: #fff;
    border-top: 1px solid #eee;
    padding: 10px 0;
    
    .controll {
        margin-right: 5px;
        display: inline-block;
        font-size: 16px;
        padding: 7px 10px 5px 10px;
        border: 1px solid #ccc
    }

    .clickable {
        background-color: #fff;
        color: #000;
        text-decoration: none;
        cursor: pointer;

        &:hover {
            background-color: #06f2;
        }

        &:active {
            transform: scale(0.9, 0.9);
        }
    }

`;

const StudentList = memo(() => {
  /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.StudentSlice);


  /** 최초 마운드 시 리덕스를 통해 목록을 조회한다. */
  useEffect(() => {
    dispatch(getList());
  },[]);

  console.log(data);

  /** 테이블 생성을 위한 배열 */
  const profArr = ['No.', '이름', '아이디', '학년', '주민번호', '생년월일', '연락처', '키', '몸무게', '학과번호', '교수번호', '수정', '삭제'];

  /** 삭제 버튼에 대한 이벤트 리스너 */
  const onStudentItemDelete = useCallback((e) => {
    e.preventDefault();

    const current = e.target;
    const { id, name } = current.dataset;

    if (window.confirm(`정말 ${name}을 삭제하시겠습니까?`)) {
      dispatch(deleteItem({id: id}))
    }
  },[]);

  /** 페이지 강제 이동 처리를 위한 navigate 함수 생성 */
  const navigate = useNavigate();

  /** 수정 버튼에 대한 이벤트 리스너 */
  const onStudentSubmit = useCallback((e) => {
    e.preventDefault();

    const { id } = e.target.dataset;   
    navigate(`/student_edit/${id}`);
  },[]);

  return (
    <div>
      {/* 로딩바 */}
      <Spinner loading={loading} />

      {/* 학생추가하기 폼 */}
      <AddContainer>
        <NavLink to='student_add' className='controll clickable'>학생정보 추가하기</NavLink>
      </AddContainer>

      {/* 조회결과 표시 */}
      {error? (
        <ErrorView error={error} />
      ) : (
        // Ajax 처리 결과가 존재하는 경우
        data && (
          <Table>
            <thead>
              <tr>
                {profArr.map((v, i) => {
                  return (
                    <th key={i}>{v}</th>
                  )
                })}
              </tr>
              </thead>
              <tbody>
                {
                  // 데이터 수가 0인 경우를 구분
                  data.length > 0 ? (
                    data.map(({id, name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno}, i) => {
                      return (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>
                            <NavLink to={`/student_view/${id}`}>{name}</NavLink>
                          </td>
                          <td>{userid}</td>
                          <td>{grade}</td>
                          <td>{idnum}</td>
                          <td>{birthdate? (dayjs(birthdate).format('YY-MM-DD')) : ('')}</td>
                          <td>{tel}</td>
                          <td>{height}</td>
                          <td>{weight}</td>
                          <td>{deptno}</td>
                          <td>{profno}</td>
                          <td>
                            <button type='button' onClick={onStudentSubmit} data-id={id}>수정하기</button>
                          </td>
                          <td>
                            <button type='button' data-id={id} data-name={name} onClick={onStudentItemDelete}>삭제하기</button>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <tr>
                      <td colSpan='11' align='center'>
                        데이터가 존재하지 않습니다.
                      </td>
                    </tr>
                  )
                }
              </tbody>
          </Table>
        )
      )}
    </div>
  )
})

export default StudentList;