import React, { forwardRef, ForwardedRef, useRef, useEffect } from 'react';
import { TextArea, styledType } from './style';

import { SetterOrUpdater } from 'recoil';

interface propsType extends styledType {
  placeholder?: string;
  defaultValue?: string;
  text?: any;
  setText?: any;
  useSetRecoilState?: SetterOrUpdater<any>;
  recoilParam?: string;
  disabled?: boolean;
}

/**
 *
 * @description
 * TextArea 생성 컴포넌트
 *
 * @example
 * 비활성화가 아니고 resize가 불가능한 TextArea
 * <TextArea
      width={'200px'}
      height={'40px'}
      placeholder={'내용을 입력하세요'}
      defaultValue={'처음부터 입력돼있는 값'}
      disabled={false}
      nonResize={true}
    ></TextArea>
 * 
 * @param {string?}                                   width              컴포넌트 width [default: 400]
 * @param {string?}                                   height             컴포넌트 height [default: 30]
 * @param {string?}                                   placeholder        컴포넌트 placeholder [default: '']
 * @param {string?}                                   defaultValue       컴포넌트에 들어갈 값 [default: '']
 * - React에서는 바닐라 JS와 달리 value가 Read Only여서 수정이 불가능. 대신 defaultValue를 채택 시 수정 가능한 value를 사용할 수 있다.
 * @param {string?}                                   text               TextAreaBox에서 props로 주는 컴포넌트 내부값 상태
 * @param {string?}                                   setText            컴포넌트 내부값 상태 setState 함수
 * @param {string?}                                   useSetRecoilState  recoil 상태값 set 함수
 * @param {string?}                                   recoilParam        값을 저장할 param
 * @param {string?}                                   disabled           컴포넌트 비활성화 상태 여부
 * @param {string?}                                   nonResize          Resize 불가능 상태 여부
 * @param {React.ForwardedRef<HTMLTextAreaElement>}   ref                DOM 참조용 ref
 * @author dbcs
 */

const index = forwardRef<HTMLTextAreaElement, propsType>(
  (
    {
      width,
      height,
      placeholder,
      defaultValue,
      text,
      setText,
      useSetRecoilState,
      recoilParam,
      disabled,
      nonResize,
    },
    ref,
  ) => {
    // const [text, setText] = useState<string>(defaultValue ? defaultValue : '');

    const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      if (useSetRecoilState && recoilParam)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        useSetRecoilState(prevObj => {
          return {
            ...prevObj,
            [recoilParam]: e.target.value,
          };
        });
    };

    const useForwardRef = <T,>(ref: ForwardedRef<T>, initialValue: any = null) => {
      const targetRef = useRef<T>(initialValue);

      useEffect(() => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(targetRef.current);
        } else {
          ref.current = targetRef.current;
        }
      }, [ref]);

      return targetRef;
    };
    const inputRef = useForwardRef<HTMLTextAreaElement>(ref);
    useEffect(() => {
      setText(defaultValue);
    }, [defaultValue]);
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = text ? text : '';
      }
    }, [text]);
    return (
      <TextArea
        ref={inputRef}
        width={width}
        height={height}
        placeholder={placeholder}
        defaultValue={text}
        onChange={changeHandler}
        disabled={disabled}
        nonResize={nonResize}
      ></TextArea>
    );
  },
);

export default index;
