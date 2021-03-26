
const zoomsize = 0.8
const unit_type_list =  [
    {
      name: "2-Bedroom",
      color: "#D4EFFC",
      to_type: [
        {
          name: "Type A1 - 52sqm",
          type: "A1",
          color: "#D4EFFC",
          imgnames:12,
          typecls: [
            { w: '4.5%', h: '3%', x: '45.8%', y: '58.5%', color: '#D4EFFC',type:"A1",img:"3" },
          ],
        },
        {
          name: "Type A2 - 55sqm",
          type: "A2",
          color: "#D4EFFC",
          imgnames:45,
          typecls: [
            { w: '4.4%', h: '31%', x: '52.2%', y: '27%', color: '#D4EFFC',type:"A2" },
          ],
        },
        {
          name: "Type A3 - 61sqm",
          type: "A3",
          color: "#D4EFFC",
          imgnames:45,
          typecls: [
            { w: '4.4%', h: '31%', x: '46.5%', y: '27%', color: '#D4EFFC',type:"A3" },
          ],
        },
      ],
    },
     {
      name: "2-Bedroom + Guest",
      color: "#FFF9B8",
      to_type: [
        {
          name: "Type B - 74sqm",
          type: "B",
          color: "#FFF9B8",
          imgnames:12,
          typecls: [
            { w: '4.4%', h: '29.5%', x: '46.5%', y: '27%', color: '#D4EFFC',type:"B" },

          ],
        },
      ],
    },
     {
      name: "3-Bedroom + Guest",
      color: "#FEE0C9",
      to_type: [
        {
          name: "Type C - 87sqm",
          type: "C",
          color: "#FEE0C9",
          imgnames:12,
          typecls: [
            { w: '4.8%', h: '29.5%', x: '51.5%', y: '27%', color: '#D4EFFC',type:"C" },

          ],
        },
      ],
    },
    
  ]






export default {
    unit_type_list,
    zoomsize


};





