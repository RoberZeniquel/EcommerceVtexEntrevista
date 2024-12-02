import React, { useState } from "react";
import PropTypes from "prop-types";

const MenuCustom = ({ items }) => {
  const [openLevel1, setOpenLevel1] = useState(null);
  const [openLevel2, setOpenLevel2] = useState(false);

  const handleLevel1Click = (index) => {
    setOpenLevel1(openLevel1 === index ? null : index);
    setOpenLevel2(false);
  };

  const handleLevel2Click = () => {
    setOpenLevel2(!openLevel2);
  };

return (
    <div className="menu-container">

      <style>{`
        .menu-container {
          margin: 20px;
          font-family: Arial, sans-serif;
        }

        /* Nivel 1 */
        .menu-level1 {
          list-style-type: none;
          padding: 0;
          display: flex;
        }

        .menu-item {
          margin-bottom: 10px;
        }

        
        .menu-button-level1 {
          border-left: solid 1.5px #259c2d;
        }

        .menu-button-level1-1 {
          border-left: none;
        }
      

        .menu-button {
          cursor: pointer;
          padding: 8px 12px;
          font-size: 14px;
          transition: background-color 0.3s;
          text-decoration: none;
          color: grey;
          width: 100%;
          text-align: center;
          display:block;
        }

        .menu-button:hover {
          background-color: #e0e0e0;
        }

        /* Nivel 2 */
        .menu-level2 {
          margin-top: 10px;
          list-style-type: none;
          padding-left: 0px;
        }

        .menu-level2 .menu-item {
          margin-bottom: 8px;
        }

        /* Nivel 3 */
        .menu-level3 {
          margin-top: 10px;
          list-style-type: none;
          padding-left: 0px;
        }

        .menu-level3 .menu-item {
          margin-bottom: 5px;
        }

        @media (max-width: 768px) {
        
        .menu-level1 {
          display: block;
        }
        
        
        }
      `}</style>



      <ul className="menu-level1">
        {items.map((item, i) => (
          <li key={i} className={`menu-item menu-item-level1 menu-item-level1-${i+1}`}>
            <a
              href={item.link || "#"}
              onClick={() => handleLevel1Click(i)}
              className={`menu-button menu-button-level1 menu-button-level1-${i+1}`}
            >
              {item.label}
            </a>
            {openLevel1 === i && item.subItems && (
              <ul className="menu-level2">
                {item.subItems.map((subItem, j) => (
                  <li key={j} className="menu-item">
                    <a
                      href={subItem.link || "#"}
                      onClick={handleLevel2Click}
                      className="menu-button"
                    >
                      {subItem.label}
                    </a>
                    {openLevel2 && subItem.subItems && (
                      <ul className="menu-level3">
                        {subItem.subItems.map((subSubItem, k) => (
                          <li key={k} className="menu-item">
                            <a
                              href={subSubItem.link || "#"}
                              className="menu-button"
                            >
                              {subSubItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

MenuCustom.schema = {
  title: "Menú Personalizado",
  description: "Un menú con múltiples niveles de navegación editable desde el Site Editor.",
  type: "object",
  properties: {
    items: {
      title: "Ítems del Menú",
      type: "array",
      items: {
        type: "object",
        properties: {
          label: {
            type: "string",
            title: "Texto del Nivel 1"
          },
          link: {
            type: "string",
            title: "Enlace del Nivel 1",
            description: "URL al que se redirige este elemento"
          },
          subItems: {
            type: "array",
            title: "Subítems del Nivel 2",
            items: {
              type: "object",
              properties: {
                label: {
                  type: "string",
                  title: "Texto del Nivel 2"
                },
                link: {
                  type: "string",
                  title: "Enlace del Nivel 2",
                  description: "URL al que se redirige este subítem"
                },
                subItems: {
                  type: "array",
                  title: "Subítems del Nivel 3",
                  items: {
                    type: "object",
                    properties: {
                      label: {
                        type: "string",
                        title: "Texto del Nivel 3"
                      },
                      link: {
                        type: "string",
                        title: "Enlace del Nivel 3",
                        description: "URL al que se redirige este subítem"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

MenuCustom.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string,
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          link: PropTypes.string,
          subItems: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              link: PropTypes.string,
            })
          ),
        })
      ),
    })
  ),
};

MenuCustom.defaultProps = {
    "items": [
        {
          "label": "Menu 1 - departamento",
          "link": "#",
          "subItems": [
            {
              "label": "Menu 1 - categoria",
              "link": "#",
              "subItems": [
                { "label": "Menu 1 - subcategoria", "link": "#" }
              ]
            }
          ]
        },
        {
          "label": "Menu 2 - departamento",
          "link": "#",
          "subItems": [
            {
              "label": "Menu 2 - categoria",
              "link": "#",
              "subItems": [
                { "label": "Menu 2 - subcategoria", "link": "#" }
              ]
            }
          ]
        },
        {
          "label": "Menu 3 - departamento",
          "link": "#",
          "subItems": [
            {
              "label": "Menu 3 - categoria",
              "link": "#",
              "subItems": [
                { "label": "Menu 3 - subcategoria", "link": "#" }
              ]
            }
          ]
        },
        {
          "label": "Menu 4 - departamento",
          "link": "#",
          "subItems": [
            {
              "label": "Menu 4 - categoria",
              "link": "#",
              "subItems": [
                { "label": "Menu 4 - subcategoria", "link": "#" }
              ]
            }
          ]
        }
      ]
};

export default MenuCustom;