export default function heatmap({canvas, context}, rows, cols, boxInfo){

    const rowsPerPerson = rows

    const people = boxInfo.average.length
    rows = people * rows

    const max = Math.max(...boxInfo.average.flat(2))

    var bw = canvas.width;
    var bh = canvas.height;
    let colSize = bw / cols
    let rowSize = bh / rows

    let lastPerson = 0;
    for (var row = 0; row < rows; row ++) {
      for (var col = 0; col < cols; col ++) {

        const x = col*colSize
        const y = row*rowSize
        let person = Math.floor(row / rowsPerPerson) 
        if (person != lastPerson) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(bw, y);
            context.strokeStyle = 'white' // Draw white line to separate people
            context.stroke();
        }
        lastPerson = person
        const data = boxInfo.average[person]

        const personRow = (row % rowsPerPerson)
        if (boxInfo.start > personRow || boxInfo.end <= personRow) {
            context.fillStyle = `rgb(0,0,0)`
        } else {
            const informativeRow = (personRow - boxInfo.start)
            const relVal = (data[col][informativeRow] / max)
            const b = 0
            const g = 0
            const r = 255 * relVal
            context.fillStyle = `rgb(${r}, ${g}, ${b})`
        }
        context.fillRect(x, y, colSize, rowSize)

      }
    }
}
