import { Tooltip, Typography } from "@mui/material";
import React, { memo, useState, useEffect } from "react";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";
import MapControls from "./MapControls";

const UsMap = ({ setState, setMap, }) => {
	const [geo, fetchMap] = useState(null);
	useEffect(() => {
		const request = new Request("/api/maps/us", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		fetch(request)
			.then((response) => response.json())
			.then((data) => fetchMap(data));
	}, []);

	const [position, setPosition] = useState({
		coordinates: [-96.6, 38.7],
		zoom: 1,
	});

	function handleZoomIn() {
		if (position.zoom >= 4) return;
		setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
	}

	function handleZoomOut() {
		if (position.zoom <= 1) return;
		setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
	}

	function handleMoveEnd(position) {
		let lowX = -120.6;
		let highX = -72.6;
		let lowY = 28.7;
		let highY = 48.7;
		let x = position.coordinates[0];
		let y = position.coordinates[1];
		if(x>lowX && x<highX && y>lowY && y<highY) setPosition(position);
	}

	function handleReset() {
		setPosition((position) => ({
			...position,
			coordinates: [-96.6, 38.7],
			zoom: 1,
		}));
	}

	return (
		<div data-tip="">
			<MapControls
				handleZoomIn={handleZoomIn}
				handleZoomOut={handleZoomOut}
				handleReset={handleReset}
			></MapControls>
			<ComposableMap
				projection="geoAlbersUsa"
				style={{ width: "100%", height: "800px" }}
			>
				<ZoomableGroup
					zoom={position.zoom}
					center={position.coordinates}
					onMoveEnd={handleMoveEnd}
				>
					<Geographies geography={geo}>
						{({ geographies }) =>
							geographies.map((geo) => (
								<Tooltip
									title={
										<Typography fontSize={20}>{geo.properties.name}</Typography>
									}
									placement="top"
									arrow
									followCursor
									key={geo.rsmKey}
								>
									<Geography
										key={geo.rsmKey}
										geography={geo}
										stroke="#000"
										strokeWidth={0.5}
										onClick={() => {
											if (
												geo.properties.name === "Maryland" ||
												geo.properties.name === "Mississippi" ||
												geo.properties.name === "Georgia"
											) {
												setState(geo.properties.name);
												setMap(true);
											}
										}}
										style={{
											default: {
												fill:
													geo.properties.name === "Maryland" ||
													geo.properties.name === "Mississippi" ||
													geo.properties.name === "Georgia"
														? "#a5d6a7"
														: "#EEEEEE",
												outline: "none",
											},
											hover: {
												fill:
													geo.properties.name === "Maryland" ||
													geo.properties.name === "Mississippi" ||
													geo.properties.name === "Georgia"
														? "#ce93d8"
														: "#D6D6DA",
												outline: "none",
												cursor: "pointer",
											},
											pressed: {
												fill:
													geo.properties.name === "Maryland" ||
													geo.properties.name === "Mississippi" ||
													geo.properties.name === "Georgia"
														? "#E42"
														: "#D6D6DA",
												outline: "none",
											},
										}}
									/>
								</Tooltip>
							))
						}
					</Geographies>
				</ZoomableGroup>
			</ComposableMap>
		</div>
	);
};

export default memo(UsMap);
