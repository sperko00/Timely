import React,{Component} from "react"
import PieChart from "react-svg-piechart"

export class ChartComponent extends Component{
  
  render()
  {

    var data = this.props.data.map((tag,i) => {
        var data_object = {
            title : tag.name,
            value : tag.duration,
            color : this.props.colors[i]
        }
        return data_object;
    })
      
      return(
          <div className="chart">
  <PieChart
    data={data}
    strokeWidth = {0}
    expandOnHover
   
        />
    </div>

      )
    }}

