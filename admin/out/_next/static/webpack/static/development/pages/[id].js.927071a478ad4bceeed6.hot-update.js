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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/next/dist/build/polyfills/fetch/index.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _src_scapeHtml__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../src/scapeHtml */ "./src/scapeHtml.js");


var _jsxFileName = "D:\\desenvolvimento\\snippets-codes\\admin\\pages\\[id].js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



var ReactMarkdown = __webpack_require__(/*! react-markdown */ "./node_modules/react-markdown/lib/react-markdown.js");




 // var escapeHtml = unsafe => {
//     return unsafe
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/"/g, '&quot;')
//       .replace(/'/g, '&#039;');
//   };

var App = function App(_ref) {
  var note = _ref.note,
      ADDRESS_SERVE_ADONIS = _ref.ADDRESS_SERVE_ADONIS,
      info = _ref.info;
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
      setCescription = _useState3[1];

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
    setCescription(ev.target.value);
  }

  var handlerSave = function handlerSave() {
    isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6___default()("".concat(ADDRESS_SERVE_ADONIS, "/notes/").concat(note_id), {
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
      lineNumber: 52
    },
    __self: this
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    style: {
      marginTop: 50
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, __jsx("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }, "Editar nota"))), __jsx("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 58
    },
    __self: this
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
    xs: 8,
    md: 8,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Group, {
    controlId: "exampleForm.ControlTextarea1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
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
      lineNumber: 63
    },
    __self: this
  }), __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, "Descri\xE7\xE3o:"), __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Control, {
    as: "textarea",
    rows: "4",
    onChange: handlerChangeDescription,
    value: description,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }), __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, "C\xF3digo:"), __jsx(react_bootstrap_Form__WEBPACK_IMPORTED_MODULE_4__["default"].Control, {
    as: "textarea",
    rows: "10",
    onChange: handlerChangeCodigo,
    value: codigo,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  })), __jsx("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }), __jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    onClick: handlerSave,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
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
      lineNumber: 90
    },
    __self: this
  }, __jsx("h2", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: this
  }, "Sa\xEDda:"), __jsx(ReactMarkdown, {
    source: codigo,
    escapeHtml: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
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
          console.log(ADDRESS_SERVE_ADONIS);
          _context.next = 4;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_6___default()("".concat(ADDRESS_SERVE_ADONIS, "/notes/").concat(id, "/edit")));

        case 4:
          res = _context.sent;
          _context.next = 7;
          return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(res.text());

        case 7:
          note = _context.sent;

          if (!(note.length > 0)) {
            _context.next = 11;
            break;
          }

          note = JSON.parse(note);
          return _context.abrupt("return", {
            ADDRESS_SERVE_ADONIS: ADDRESS_SERVE_ADONIS,
            note: note,
            'info': 'success'
          });

        case 11:
          return _context.abrupt("return", {
            ADDRESS_SERVE_ADONIS: ADDRESS_SERVE_ADONIS,
            'info': 'not_found'
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

/* harmony default export */ __webpack_exports__["default"] = (App);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/scapeHtml.js":
/*!**************************!*\
  !*** ./src/scapeHtml.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var escapeHtml = function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

/* harmony default export */ __webpack_exports__["default"] = (escapeHtml);

/***/ })

})
//# sourceMappingURL=[id].js.927071a478ad4bceeed6.hot-update.js.map