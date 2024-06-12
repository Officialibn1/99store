import React, { ReactNode } from "react";
import "./SectionHeader.scss";
import { Link } from "react-router-dom";
import { BsCaretRight } from "react-icons/bs";

type Props = {
	title: string;
	icon: ReactNode;
	link?: string;
};

const SectionHeader = (props: Props) => {
	return (
		<div className=' section_header'>
			<div>
				<span>{props.icon}</span>

				<h1>{props.title}</h1>
			</div>

			{props.link && (
				<Link to={props.link}>
					<span>View All</span>

					<BsCaretRight />
				</Link>
			)}
		</div>
	);
};

export default SectionHeader;
