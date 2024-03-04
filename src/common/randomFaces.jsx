export function randomFaces() {
	const faceCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	const randomIndex = faceCount[Math.floor(Math.random() * faceCount.length)];

	const path = `/svg_faces/face_${randomIndex}.svg`;

	return path;
}
