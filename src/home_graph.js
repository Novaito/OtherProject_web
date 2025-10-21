import React, {useEffect, useRef} from "react";
import * as d3 from "d3";

export default function HomeGraph({
    data,
    width = 800,
    height = 500,
    marginTop = 20,
    marginRight = 40,
    marginBottom = 0,
    marginLeft = 40,
  }) {
    const gx = useRef();
    const gy = useRef();
    const svgref = useRef();
  
    useEffect(() => {
      const svg = d3.select(svgref.current);
      const clip = "clip-" + Date.now(); // Générer un ID unique
  
      // Créer le clipPath
      svg.append("clipPath")
        .attr("id", clip)
        .append("rect")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom);
  
      // Définir les échelles pour x et y
      const scaleY = [0, d3.extent(data)[1]];
      const x = d3.scaleLinear([0, 30], [marginLeft, width - marginRight]);
      const y = d3.scaleLinear(scaleY, [height - marginBottom, marginTop]);
  
      // Définir la fonction d'aire
      const area = d3.area()
        .x((d, i) => x(i)) // Position X
        .y0(height - marginBottom) // Point de départ de l'aire
        .y1((d) => y(d)); // Point final de l'aire (selon la donnée)
  
      // Créer l'aire sous la courbe
      svg.append("path")
        .attr("clip-path", `url(#${clip})`)
        .attr("fill", "#cd3ef15b")
        .attr("d", area(data)); // Applique la fonction d'aire aux données
    }, [data, width, height]);
  
    // Personnalisation des axes
    useEffect(() => {
        const x = d3.scaleLinear([0, 30], [marginLeft, width - marginRight]);
        const y = d3
          .scaleLinear([0, 120], [height - marginBottom, marginTop]);
      
      const axisBottom = d3.axisBottom(x);
      const axisLeft = d3
        .axisLeft(y);
      
      d3.select(gy.current)
        .call(axisLeft);

      d3.select(gx.current)
          .call(axisBottom)
          .select('.domain')
          .style('stroke', 'rgba(0,0,0,0)');
  
      d3.select(gx.current)
        .call(axisBottom)
        .selectAll(' .tick text')
        .style('fill', 'rgba(200, 200, 200, 0.5)')
        .style('font-size', '12px');
  
      d3.select(gx.current)
        .call(axisBottom)
        .selectAll(' .tick line')
        .attr('y1', 0)
        .attr('y2', 0);
  
      d3.select(gy.current)
        .call(axisLeft)
        .select('.domain')
        .style('stroke', 'rgba(0,0,0,0)');
  
      d3.select(gy.current)
        .call(axisLeft)
        .selectAll(' .tick text')
        .style('fill', 'rgba(200, 200, 200, 0.5)')
        .style('font-size', '12px');
      
  
      d3.select(gy.current)
        .call(axisLeft)
        .selectAll(' .tick line')
        .attr('x1', 0)
        .attr('x2', (width - marginLeft - marginRight))
        .style('stroke', 'rgba(210, 210, 210, 0.2');
    }, [data, width, height]);
  
    return (
      <svg ref={svgref} width={width} height={height} className="graph">
        <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
        <g ref={gy} transform={`translate(${marginLeft}, 0)`} />
      </svg>
    );
  }