webpackHotUpdate("static\\development\\pages\\[id].js",{

/***/ "./pages/[id].js":
/*!***********************!*\
  !*** ./pages/[id].js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap/Form */ "./node_modules/react-bootstrap/esm/Form.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/next/dist/build/polyfills/fetch/index.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _src_scapeHtml__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../src/scapeHtml */ "./src/scapeHtml.js");


var _jsxFileName = "D:\\desenvolvimento\\snippets-codes\\admin\\pages\\[id].js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



var ReactMarkdown = __webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/lib/react-markdown.js");





var Saida = function Saida(_ref) {
  var titulo = _ref.titulo,
      descricao = _ref.descricao,
      codigo = _ref.codigo;
  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, "T\xEDtulo:"), __jsx(ReactMarkdown, {
    source: titulo,
    escapeHtml: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, "Descri\xE7\xE3o:"), __jsx(ReactMarkdown, {
    source: descricao,
    escapeHtml: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, "T\xEDtulo:"), __jsx(ReactMarkdown, {
    source: codigo,
    escapeHtml: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }));
};

var App = function App(_ref2) {
  var note = _ref2.note,
      ADDRESS_SERVE_ADONIS = _ref2.ADDRESS_SERVE_ADONIS,
      info = _ref2.info;
  var note_id = note.note_id,
      note_title = note.note_title,
      note_code = note.note_code,
      note_description = note.note_description;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(note_title),
      titulo = _useState[0],
      setTitulo = _useState[1];

  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(note_code),
      codigo = _useState2[0],
      setCodigo = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(note_description),
      description = _useState3[0],
      setDescription = _useState3[1];

  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(info),
      inf = _useState4[0],
      setInf = _useState4[1];

  function handlerChangeCodigo(ev) {
    setCodigo(ev.target.value);
  }

  function handlerChangeTitulo(ev) {
    setTitulo(ev.target.value);
  }

  function handlerChangeDescription(ev) {
    setDescription(ev.target.value);
  }

  var handlerSave = function handlerSave() {
    isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5___default()("".concat(ADDRESS_SERVE_ADONIS, "/notes/").concat(note_id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()({
        note_id: note_id,
        titulo: titulo,
        codigo: codigo,
        description: description
      })
    }).then(function (response) {
      console.log(response);
    });
  };

  return __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Container"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    style: {
      marginTop: 20
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, "Editar nota"))), __jsx("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: 8,
    md: 8,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }, __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Group, {
    controlId: "exampleForm.ControlTextarea1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, "T\xEDtulo:"), __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Control, {
    as: "input",
    rows: "10",
    autoFocus: true,
    onChange: handlerChangeTitulo,
    value: titulo,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }), __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, "Descri\xE7\xE3o:"), __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Control, {
    as: "textarea",
    rows: "4",
    onChange: handlerChangeDescription,
    value: description,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: this
  }), __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, "C\xF3digo:"), __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Control, {
    as: "textarea",
    rows: "10",
    onChange: handlerChangeCodigo,
    value: codigo,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  })), __jsx("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    onClick: handlerSave,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, "Salvar")), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: 4,
    md: 4,
    sm: 4,
    style: {
      borderWidth: 0,
      borderColor: 'red',
      borderStyle: 'solid'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }, __jsx(Saida, {
    titulo: titulo,
    descricao: description,
    codigo: codigo,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }))));
};

var ADDRESS_SERVE_ADONIS = process.env.adonis_address;

App.getInitialProps = function _callee(context) {
  var id, res, note;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = context.query.id;
          _context.next = 3;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_5___default()("".concat(ADDRESS_SERVE_ADONIS, "/notes/").concat(id, "/edit")));

        case 3:
          res = _context.sent;
          _context.next = 6;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(res.text());

        case 6:
          note = _context.sent;

          if (!(note.length > 0)) {
            _context.next = 10;
            break;
          }

          note = JSON.parse(note);
          return _context.abrupt("return", {
            ADDRESS_SERVE_ADONIS: ADDRESS_SERVE_ADONIS,
            note: note,
            info: 'success'
          });

        case 10:
          return _context.abrupt("return", {
            ADDRESS_SERVE_ADONIS: ADDRESS_SERVE_ADONIS,
            info: 'not_found'
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (App);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ })

})
//# sourceMappingURL=[id].js.69e097e88b75adbb719d.hot-update.js.map