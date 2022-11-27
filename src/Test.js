import React, { memo, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getList, getItem, postItem, putItem, deleteItem } from './slice/StudentSlice';

const Test = memo(() => {
    const dispatch = useDispatch();
    const { data, loading, error} = useSelector((state) => state.StudentSlice);

    useEffect(() => {
        // dispatch(getList());
        
        // dispatch(getItem({id : 10104}));

        // dispatch(postItem({name: 'test', userid: 'test'}));

        // dispatch(putItem({id: 20106, name: '수정test', userid: 'test'}));

        // dispatch(deleteItem({id: 20106}));
    }, [dispatch]);

    console.log(data);
    console.log(loading)
    return (

        loading ? "loading..." : (
            error ? JSON.stringify(error) : (
                <>
                    {JSON.stringify(data)}
                </>
            )
        )
    )
});

export default Test;