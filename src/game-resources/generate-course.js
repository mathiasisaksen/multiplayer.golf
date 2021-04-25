let course1 = JSON.parse(`{
    "boundary": [
      {
        "x": 21.3,
        "y": 197.3
      },
      {
        "x": 21.3,
        "y": 20.3
      },
      {
        "x": 197.3,
        "y": 20.3
      },
      {
        "x": 197.3,
        "y": 90.3
      },
      {
        "x": 91.7,
        "y": 90.3
      },
      {
        "x": 91.7,
        "y": 197.3
      }
    ],
    "covers": [
      {
        "type": "water",
        "vertices": [
          {
                "x": 57.5,
                "y": 90.3
          },
          {
            "x": 69.9,
            "y": 140.8
          },
          {
            "x": 45.1,
            "y": 140.8
          }
        ]
      },
      {
        "type": "sand",
        "vertices": [
          {
            "x": 67.8,
            "y": 93
          },
          {
            "x": 80.3,
            "y": 90.3
          },
          {
            "x": 93,
            "y": 87.5
          },
          {
            "x": 107.8,
            "y": 83
          },
          {
            "x": 111.3,
            "y": 73
          },
          {
            "x": 109.5,
            "y": 65.4
          },
          {
            "x": 96.8,
            "y": 65.4
          },
          {
            "x": 86.6,
            "y": 67.8
          },
          {
            "x": 75.8,
            "y": 73
          },
          {
            "x": 69.9,
            "y": 77.4
          },
          {
            "x": 62.5,
            "y": 83
          },
          {
            "x": 62.5,
            "y": 86
          },
          {
            "x": 63.7,
            "y": 88.9
          },
          {
            "x": 64.8,
            "y": 91.5
          },
          {
            "x": 65.5,
            "y": 92.4
          },
          {
            "x": 66.5,
            "y": 92.8
          }
        ],
        "frictionMultiplier": 5
      }
    ],
    "obstacles": [
      [
        {
          "x": 152.4,
          "y": 46.9
        },
        {
          "x": 120.4,
          "y": 46.9
        },
        {
          "x": 114.8,
          "y": 38.1
        },
        {
          "x": 157.5,
          "y": 38.1
        }
      ],
      [
        {
          "x": 153,
          "y": 61.1
        },
        {
          "x": 121,
          "y": 61.1
        },
        {
          "x": 115.3,
          "y": 69.9
        },
        {
          "x": 158.1,
          "y": 69.9
        }
      ]
    ],
    "hole": {
      "position": {
        "x": 173.8,
        "y": 54.6
      },
      "radius": 8.8
    },
    "golfBall": {
      "initialPosition": {
        "x": 56.8,
        "y": 178
      },
      "radius": 2.8
    }
  }`);

let i = 0;
function generateCourse() {
    return(course1);
    let courseData;
    if (i === 0) {
        courseData = {
            boundary: [
                {x: 10, y: 40},
                {x: 30, y: 40},
                {x: 30, y: 45},
                {x: 65, y: 45},
                {x: 65, y: 40},
                {x: 90, y: 40},
                {x: 90, y: 60},
                {x: 65, y: 60},
                {x: 65, y: 55},
                {x: 30, y: 55},
                {x: 30, y: 60},
                {x: 10, y: 60}
            ],
            obstacles: [
                [
                    {x: 15, y: 55},
                    {x: 25, y: 55},
                    {x: 25, y: 45},
                    {x: 15, y: 45}
                ]
            ],
            covers: [
                {
                    type: 'sand', 
                    frictionMultiplier: 5, 
                    vertices: [{x: 65, y: 52},
                               {x: 65, y: 55},
                               {x: 30, y: 55},
                               {x: 30, y: 52}]
                },
            
                {
                    type: 'water',
                    vertices: [{x: 66, y: 40},
                               {x: 66, y: 60},
                               {x: 29, y: 60},
                               {x: 29, y: 40}]
                },

                {
                    type: 'bridge',
                    vertices: [{x: 67, y: 49},
                               {x: 67, y: 51},
                               {x: 28, y: 51},
                               {x: 28, y: 49}]
                },
            
                {
                    type: 'wind',
                    windStrength: 10,
                    vertices: [{x: 65, y: 45},
                               {x: 65, y: 48},
                               {x: 30, y: 48},
                               {x: 30, y: 45}]
                }
            ],
            golfBall: {initialPosition: {x: 80, y: 50}, radius: 0.8},
            hole: {position: {x: 12.5, y: 50}, radius: 2.1}
            };
    } else {
        courseData = {boundary: 
            [{x: 88.38, y: 37.15},
                {x: 84.15, y: 48.92},
                {x: 72.43, y: 61.96},
                {x: 55.25, y: 68.69},
                {x: 37.56, y: 67.01},
                {x: 25.61, y: 60.48},
                {x: 14.06, y: 45.26},
                {x: 11, y: 31.88},
                {x: 88.38, y: 31.61},
                {x: 88.38, y: 35.05},
                {x: 23.92, y: 34.88},
                {x: 27.44, y: 43.97},
                {x: 34.52, y: 51.55},
                {x: 44.18, y: 55.89},
                {x: 53.69, y: 56.27},
                {x: 64.4, y: 52.28},
                {x: 71.5, y: 45.55},
                {x: 75.56, y: 37.12}], 
            golfBall: {initialPosition: {x: 80, y: 40}, radius: 0.6},
            hole: {position: {x: 86, y: 33.4}, radius: 1.5}};
    }
    i++;
    return(courseData);
}

module.exports = { generateCourse };