import { memo } from "react";

export interface HeaderProps {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-body">
          <div className="row align-items-end">
            <div className="col">
              {props.subTitle && (
                <h6 className="header-pretitle">{props.subTitle}</h6>
              )}
              <h1 className="header-title">{props.title}</h1>
            </div>
            <div className="col-auto">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
