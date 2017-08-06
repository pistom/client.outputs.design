
const data = {
  projectId: 'aFt2T8q71q',
  name: 'Projekt 1',
  numberOfVersions: 2,
  devices: {
    Small: {
      cWidth: 375,
      cHeight: 667,
    },
    Medium: {
      cWidth: 768,
      cHeight: 1024
    },
    Large: {
      cWidth: 1366,
      cHeight: 768
    }
  },
  pages: {
    Homepage: {
      devices: {
        Small: {
          designs: {
            A: {
              fileName: 'A_h1.jpg',
              iWidth: 768,
              iHeight: 2564
            },
            B: {
              fileName: 'B_h1.jpg',
              iWidth: 768,
              iHeight: 2564
            }
          },
          bWidth: 375,

        },
        Medium: {
          designs: {
            A: {
              fileName: 'A_h2.jpg',
              iWidth: 1200,
              iHeight: 2058
            },
            B: {
              fileName: 'B_h2.jpg',
              iWidth: 1200,
              iHeight: 2058
            }
          },

          bWidth: 768
        },
        Large: {
          designs: {
            A: {
              fileName: 'A_h3.jpg',
              iWidth: 1920,
              iHeight: 1747,
            },
            B: {
              fileName: 'B_h3.jpg',
              iWidth: 1920,
              iHeight: 1747,
            }
          },
          bWidth: 1200,
          active: {
            btns: {
              Homepage: {
                isActive: true,
                page: 'Homepage',
                box: [0, 0, 230, 55]
              },
              AboutUs: {
                page: 'AboutUs',
                box: [610, 10, 80, 30]
              },
              Blog: {
                page: 'Blog',
                box: [690, 10, 70, 30]
              },
              Contact: {
                page: 'Contact',
                box: [760, 10, 90, 30]
              }
            }
          }
        }
      }
    },
    AboutUs: {
      devices: {
        Small: {
          designs: {
            A: {
              fileName: 'A_a1.jpg',
              iWidth: 768,
              iHeight: 1792
            },
            B: {
              fileName: 'B_a1.jpg',
              iWidth: 768,
              iHeight: 1792
            }
          },
          bWidth: 360
        },
        Medium: {
          designs: {
            A: {
              fileName: 'A_a2.jpg',
              iWidth: 1200,
              iHeight: 1358
            },
            B: {
              fileName: 'B_a2.jpg',
              iWidth: 1200,
              iHeight: 1358
            }
          },
          bWidth: 768
        },
        Large: {
          designs: {
            A: {
              fileName: 'A_a3.jpg',
              iWidth: 1920,
              iHeight: 1127,
            },
            B: {
              fileName: 'B_a3.jpg',
              iWidth: 1920,
              iHeight: 1127,
            }
          },
          bWidth: 1200,
          active: {
            btns: {
              Homepage: {
                isActive: true,
                page: 'Homepage',
                box: [0, 0, 230, 55]
              },
              AboutUs: {
                page: 'AboutUs',
                box: [610, 10, 80, 30]
              },
              Blog: {
                page: 'Blog',
                box: [690, 10, 70, 30]
              },
              Contact: {
                page: 'Contact',
                box: [760, 10, 90, 30]
              }
            }
          }
        }
      }
    },
    Blog: {
      devices: {
        Small: {
          designs: {
            A: {
              fileName: 'A_b1.jpg',
              iWidth: 768,
              iHeight: 2774
            },
            B: {
              fileName: 'B_b1.jpg',
              iWidth: 768,
              iHeight: 2774
            }
          },
          bWidth: 360
        },
        Medium: {
          designs: {
            A: {
              fileName: 'A_b2.jpg',
              iWidth: 1200,
              iHeight: 1615
            },
            B: {
              fileName: 'B_b2.jpg',
              iWidth: 1200,
              iHeight: 1615
            }
          },
          bWidth: 768
        },
        Large: {
          designs: {
            A: {
              fileName: 'A_b3.jpg',
              iWidth: 1920,
              iHeight: 1702,
            },
            B: {
              fileName: 'B_b3.jpg',
              iWidth: 1920,
              iHeight: 1702,
            }
          },
          bWidth: 1200,
          active: {
            btns: {
              Homepage: {
                isActive: true,
                page: 'Homepage',
                box: [0, 0, 230, 55]
              },
              AboutUs: {
                page: 'AboutUs',
                box: [610, 10, 80, 30]
              },
              Blog: {
                page: 'Blog',
                box: [690, 10, 70, 30]
              },
              Contact: {
                page: 'Contact',
                box: [760, 10, 90, 30]
              }
            }
          }
        }
      }
    },
    Contact: {
      devices: {
        Small: {
          designs: {
            A: {
              fileName: 'A_c1.jpg',
              iWidth: 768,
              iHeight: 2228
            },
            B: {
              fileName: 'B_c1.jpg',
              iWidth: 768,
              iHeight: 2228
            }
          },
          bWidth: 360
        },
        Medium: {
          designs: {
            A: {
              fileName: 'A_c2.jpg',
              iWidth: 1200,
              iHeight: 1901
            },
            B: {
              fileName: 'B_c2.jpg',
              iWidth: 1200,
              iHeight: 1901
            }
          },
          bWidth: 768
        },
        Large: {
          designs: {
            A: {
              fileName: 'A_c3.jpg',
              iWidth: 1920,
              iHeight: 1558,
            },
            B: {
              fileName: 'B_c3.jpg',
              iWidth: 1920,
              iHeight: 1558,
            }
          },
          bWidth: 1200,
          active: {
            btns: {
              Homepage: {
                isActive: true,
                page: 'Homepage',
                box: [0, 0, 230, 55]
              },
              AboutUs: {
                page: 'AboutUs',
                box: [610, 10, 80, 30]
              },
              Blog: {
                page: 'Blog',
                box: [690, 10, 70, 30]
              },
              Contact: {
                page: 'Contact',
                box: [760, 10, 90, 30]
              }
            }
          }
        }
      }
    }
  }
};

export default data;
