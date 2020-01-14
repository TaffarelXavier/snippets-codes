function selectOptionByValue(selectElement, value) {
  let options = selectElement.options;
  for (let i = 0, optionsLength = options.length; i < optionsLength; i++) {
    if (options[i].value == value) {
      selectElement.selectedIndex = i;
      return true;
    }
  }
  return false;
}

let mediaQuery = () => {
  if (window.matchMedia('(max-width: 575.98px)').matches) {
    return 'xs';
  }
  if (window.matchMedia('(min-width: 576px) and (max-width: 767.98px)').matches) {
    return 'sm';
  }
  if (window.matchMedia('(min-width: 768px) and (max-width: 991.98px)').matches) {
    return 'md';
  }
  if (window.matchMedia('(min-width: 992px) and (max-width: 1199.98px)').matches) {
    return 'lg';
  }
  if (window.matchMedia('(min-width: 1200px)').matches) {
    return 'xl';
  }
};

/**
 *
 */
function funcoesNota() {
  //Editar Nota
  $('.editar-nota').click(function () {
    let {
      note_id,
      note_title,
      note_description,
      note_tags,
      note_type_language,
      category_id,
      type_language
    } = JSON.parse($(this).attr('data-nota'));

    let categoriaElement = document.getElementById('gd-gategory'),
      linguagemFormatacaoElement = document.getElementById('gd-language'),
      tagsElement = document.getElementById('gd-select-tags');

    let tags = document.getElementById(`tags_${note_id}`).value;

    try {
      if (JSON.parse(tags).length > 0) {
        tags = JSON.parse(tags);
      } else {
        tags = '';
      }
    } catch (error) {
      console.error('Erro Tx1: ', error);
    }

    //Add option ao select
    if (tags.length > 0) {
      $(tagsElement).html('');
      tags.map(({ tag_id, tag_name }) => {
        $(tagsElement).append(
          `<option value='${tag_id}' selected="selected">${tag_name}</option>`
        );
      });
    }

    selectOptionByValue(categoriaElement, category_id);

    selectOptionByValue(linguagemFormatacaoElement, type_language);

    $('#modalEditarNota').modal('show');

    $('#gd-title').val(note_title);

    $('#gd-description').val(note_description);

    $('#gd-tags').val(note_tags);

    let editor = ace.edit(document.getElementById(`note_${note_id}`));

    $('#gd-get-note')
      .html(escapeHtml(editor.getValue()))
      .addClass(note_type_language);

    $('#nota-id').val(note_id);

    $('pre code').each(function (i, e) {
      hljs.highlightBlock(e);
    });
  });

  //Para copiar uma nota:
  $('.copiar').each(function (index, element) {
    $(this).click(function (ev) {
      let note_id = $(this).attr('data-id');

      let editor = ace.edit(document.getElementById(`note_${note_id}`));

      let beautify = ace.require('ace/ext/beautify'); // get reference to extension

      beautify.beautify(editor.session);
      //Copiar o código
      editor.selectAll();
      editor.focus();
      document.execCommand('copy');

      let options = {
        content: 'Código copiado com sucesso!', // text of the snackbar
        style: 'toast', // add a custom class to your snackbar
        timeout: 2000 // time in milliseconds after the snackbar autohides, 0 is disabled
      };

      $.snackbar(options);
    });
  });

  //Ace Editor
  $('.editor').each(function (i, el) {
    let _this = $(this);

    let { lang_name } = JSON.parse(_this.attr('data-note'));

    let editor = ace.edit(el, {
      mode: 'ace/mode/' + lang_name,
      maxLines: 800,
      wrap: true,
      autoScrollEditorIntoView: true,
      minLines: 1
    });

    el.style.fontSize = '16px'; //1.5vmin

    editor.setTheme('ace/theme/dracula');

    editor.session.setTabSize(4);

    editor.resize();

    editor.setOptions({
      autoScrollEditorIntoView: true,
      copyWithEmptySelection: true
    });
  });

  //Exluir nota:
  $('.excluir-nota').click(function () {
    let note_id = parseInt($(this).attr('data-nota-id'));

    let options = {
      type: 'question',
      buttons: ['Não', 'Sim'],
      title: 'Deseja realmente excluir esta nota?',
      message: 'Esta operação não poderá ser revertida.',
      detail: 'Algum detalhe aqui',
      defaultId: 0,
      cancelId: -1
    };

    remote.dialog.showMessageBox(win, options, response => {
      if (response == 1) {
        $(`#note_card_${note_id}`).remove();
        carregarCategorias();
      }
    });
  });

  $('.tag').click(function (ev) {
    let keyword = ev.target.innerText;
    $('#input-pesquisar-tag').val(keyword);
    pesquisarPorTag(keyword);
  });

  $('.open-code').click(function () {
    let { note_id, note_title, note_description } = JSON.parse($(this).attr('data-nota'));
    let win = window.open('', '_blank');
    win.document.write(
      '<html><head><title>Print it!</title><link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.17.1/build/styles/dracula.min.css"></head><body>'
    );
    win.document.write($('#note_' + note_id).html());
    win.document.write('</body></html>');
  });
}

/**
 *
 * @param {*} keyword
 */
function pesquisarPorTag(keyword) {
  if (keyword.length > 0) {
    let tags = $('.tag');
    $('.notas')
      .removeClass('d-flex')
      .attr('hidden', true)
      .hide();
    for (let k = 0; k < tags.size(); k++) {
      if (tags[k].innerText.toUpperCase() == keyword.toUpperCase()) {
        let note_id = tags[k].getAttribute('data-note-id');
        $('#note_card_' + note_id)
          .removeAttr('hidden')
          .show();
      }
    }
  } else {
    $('.notas')
      .removeAttr('hidden')
      .show();
  }
}

/**
 * Função para Buscar notas por categoria_id ou category_name
 * */
function getNotesByCategoryId(categoryId_Name, pagina, callback) {
  let myInit = { method: 'GET', mode: 'cors', cache: 'default' };
  pagina = pagina || 1;
  fetch(
    config[INDEX].baseApiRestUrl +
    '/notes-por-category-id/' +
    categoryId_Name +
    '/' +
    pagina,
    myInit
  ).then(function (response) {
    if (response.status !== 200) {
      console.warn('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(function (result) {
      callback(result);
    });
  });
}

/**
 * Carrega todos os Snippets no inicio do carregamento da página
 */
function loadTodosSnippets() {
  fetch(config[INDEX].baseApiRestUrl + '/notes', {
    method: 'GET'
  }).then(response => {
    if (response.status !== 200) {
    } else {
      response.json().then(result => {
        let content = '';

        result.map(nota => {
          content += notas(nota, []);
        });

        $('#get-notes').html(content);

        //Adiciona as funcionalidas às notas
        funcoesNota();

        if (
          $('#get-notes')
            .text()
            .toString().length > 0
        ) {
          $('#esqueleto').attr('hidden', true);
        }
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', function (event) {
  let categoryName = window.location.hash.replace('#', '');

  if (categoryName.length > 0) {
    let myInit = { method: 'GET', mode: 'cors', cache: 'default' };
    fetch(
      config[INDEX].baseApiRestUrl +
      '/get-all-categories?category_name=' +
      categoryName.toUpperCase(),
      myInit
    ).then(function (response) {
      if (response.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function (result) {
        let rs = result[0];

        carregarNotasPorCategoria(null, rs);

        let content = '';

        rs.notes.map(nota => {
          content += notas(nota, []);
        });

        $('#get-notes').html(content);

        funcoesNota();

        cabecalho(
          '#_' + rs.category_name.toLowerCase(),
          rs.category_name,
          rs.category_icon
        );
        if (rs.notes.length > 0) {
          $('#esqueleto').attr('hidden', true);
          setTimeout(function () {
            $('.list-group-item').removeClass(
              'list-group-item-action list-group-item-success'
            );
            $('#' + rs.category_name.toUpperCase()).addClass(
              'list-group-item-action list-group-item-success',
              'disabled'
            );
          }, 2000);
        }
      });
    });
  } else {
    loadTodosSnippets();
  }
});

function cabecalho(elemt, category_name, category_icon) {
  $('#painel-termo-filtrado').removeAttr('hidden');

  $('#termo-filtrado').html(
    `TERMO FILTRADO: <div 
    style="background:url('${config[INDEX].baseApiRestUrl}/images/${category_icon}') no-repeat;background-size: 95% 95%;
    background-attachment: scroll;background-position: 0px 3px;border:0px solid red;"
     class="termo-filtrado-icone"></div><strong>` +
    category_name.trim().toUpperCase() +
    '</strong>'
  );
  //Vai para o topo:
  let obj = $('#termo-filtrado').offset();
  $('html, body')
    .delay(1000)
    .animate({ scrollTop: obj.top - 70 }, 200);

  $('#esqueleto').removeAttr('hidden');

  $('.list-group-item').removeClass('list-group-item-action list-group-item-success');

  $(elemt).addClass('list-group-item-action list-group-item-success', 'disabled');
}

function carregarNotasPorCategoria(el, { total, category_id, category_name, category_icon }) {
  //Define

  if (mediaQuery() == 'xs') {
    const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(
      document.querySelector('.mdc-top-app-bar')
    );
    drawer.open = !drawer.open;
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;
    });
  }
  //Carrega o cabeçalho:
  cabecalho(el, category_name, category_icon);

  //Busca as 10 primeiras notas pelo ID de uma categoria
  getNotesByCategoryId(category_id, 1, function (res) {
    $('#get-notes').html('');

    let content = '';

    res.map(nota => {
      content += notas(nota, []);
    });

    $('#get-notes').html(content);

    funcoesNota();

    if (res.length == 1) {
      $('#esqueleto').attr('hidden', true);
      $("#div-carregar__mais").attr('hidden', true);
    } else {
      $('#esqueleto').attr('hidden', true);
      $("#div-carregar__mais").removeAttr('hidde')
    }

    console.log(total)
    console.log(document.getElementsByClassName('notas'));


  });

  /*if (Object.keys(rows).length > 0) {
    for (let data of rows) {
      
      // let rows = sqlite.run(
      //   `SELECT tag_id, tag_name from tags AS t1 JOIN note_tag AS t2 ON t1.tag_id = t2.nt_tag_fk_id WHERE t2.nt_note_fk_id = ?`,
      //   [data.note_id]
      // );
      //
    }
  }*/
  return false;
}

/**
 * Carregas as categorias na barra à esquerda.
 */
function carregarCategorias() {
  let myInit = { method: 'GET', mode: 'cors', cache: 'default' };

  fetch(config[INDEX].baseApiRestUrl + '/categories', myInit)
    .then(function (response) {
      if (response.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function (result) {
        let rows = document.getElementById('category');

        rows.innerHTML = '';

        result.sort((a, b) => {
          return a.category_order - b.category_order;
        });

        result.map(row => {
          //Destructing
          let {
            category_name,
            category_id,
            category_icon,
            category_placeholder_icon
          } = row;
          //INÍCIO - BUSCA CATEGORIAS

          let item = document.createElement('li');

          item.id = category_name;
          //Ao clicar em alguma categoria:
          item.onclick = function () {
            let el = this;
            let {total}  = JSON.parse(el.dataset.category);
            row.total = total;
            window.location.hash = category_name.toLowerCase();
            carregarNotasPorCategoria(el, row);
          };

          const ICON_PADRAO =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAAAAACpleexAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjDBMUJR7SizDUAAAAJElEQVQ4y2M4QyRgGFU4qnBkKbxw8eLNixcHtxtHFY4qHAoKAWtc+2KAiEgvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTIwVDA1OjM3OjMwKzA5OjAwhGs2fQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0yMFQwNTozNzozMCswOTowMPU2jsEAAAAASUVORK5CYII=';
          //Adiciona classes às categorias:
          $(item)
            .addClass('list-group-item justify-content-between')
            .css({ borderBottom: '1px dashed #ccc', padding: '0px !important' })
            .html(
              `<span class="categoria-nome">
              <img style="margin:0;position: relative;top:-1px; width:40px;height: 40px;background:#eee;"
               src="${
              config[INDEX].baseApiRestUrl
              }/images/${category_placeholder_icon.trim()}" alt="${category_icon.trim()}" data-src='${
              category_icon != null
                ? `${config[INDEX].baseApiRestUrl}/images/` + category_icon.trim()
                : ICON_PADRAO
              }' class="lazy" /> <!---->
              ${category_name.toUpperCase()}</span>
   <span class='badge badge-primary badge-pill' style="float:right;position:relative;top:-10px;margin:0">${
              row.total
              }</span>`
            )
            .attr('data-category', JSON.stringify(row))
            .attr('title', category_name.toUpperCase());

          rows.appendChild(item);

          setTimeout(function () {
            let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

            if (
              'IntersectionObserver' in window &&
              'IntersectionObserverEntry' in window &&
              'intersectionRatio' in window.IntersectionObserverEntry.prototype
            ) {
              let lazyImageObserver = new IntersectionObserver(function (
                entries,
                observer
              ) {
                entries.forEach(function (entry) {
                  if (entry.isIntersecting) {
                    let lazyImage = entry.target;

                    lazyImage.src = lazyImage.dataset.src;

                    lazyImage.classList.remove('lazy');

                    $(lazyImage).css({ background: 'transparent' });

                    lazyImageObserver.unobserve(lazyImage);
                  }
                });
              });

              lazyImages.forEach(function (lazyImage) {
                lazyImageObserver.observe(lazyImage);
              });
            }
          }, 100);
          //FIM - BUSCA CATEGORIAS
        });
      });
    })
    .catch(function (err) {
      console.error('Fetch Error :-S', err);
    });
}

function mergeArrayWithDiff(arrayA, arrayB) {
  let result = [...arrayA, ...arrayB].reduce((acc, item) => {
    let found = acc.find(x => x.category_name === item.category_name);
    if (found) {
      found.count += item.count;
    } else {
      acc.push(Object.assign({}, item));
    }
    return acc;
  }, []);
  return result;
}

function carregarTodasCategoria() {
  setTimeout(() => {
    let rows = document.getElementById('gd-get-categories');

    let arrayA = Category.getCategorieWithCountNotes();

    let arrayB = Category.all();

    arrayB = arrayB.map(el => {
      el.count = 0;
      return el;
    });

    let result = mergeArrayWithDiff(arrayA, arrayB);

    result.map(category => {
      let item = document.createElement('li');

      $(item)
        .addClass('mdc-list-item mdc-ripple-upgraded')
        .css({ borderBottom: '1px dashed #ccc', padding: '0px !important' })
        .html(
          `<span class="mdc-list-item__text">${category.category_name.toUpperCase()}[${
          category.count
          }]</span>
          <!--<span class="mdc-list-item__meta material-icons" aria-hidden="true" data-category-id='${
          category.category_id
          }'>delete</span>-->
          <span class="mdc-list-item__meta material-icons remove-category"
           aria-hidden="true" data-category='${JSON.stringify(category)}'>delete</span>
        `
        )
        .attr('id', 'category__' + category.category_id)
        .attr('data-category', JSON.stringify(category))
        .attr('title', category.category_name.toUpperCase());

      rows.appendChild(item);
    });
  }, 1000);
}

// Pode usar o jQuery normalmente agora.
$(document).ready(function () {
  //Abre o modal de categorias:

  $('#abrir-modal-criador-categoria').click(function () {
    setTimeout(function () {
      $('#category-name')
        .focus()
        .select();
    }, 500);
  });

  /**
    Pesquisar Categorias:
    */
  $('#categoria').keyup(function () {
    let _value = $(this);

    let keyword = removeSinaisDiacriticos(_value.val().toLowerCase());

    let categories = document.getElementById('category').childNodes;

    for (let k = 0; k < categories.length; k++) {
      let textoArray = removeSinaisDiacriticos(categories[k].title.toLowerCase());

      if (textoArray.includes(keyword)) {
        $(categories[k])
          .removeAttr('hidden')
          .show();
      } else {
        $(categories[k])
          .removeClass('d-flex')
          .attr('hidden', true)
          .hide();
      }
    }

    $('.categoria-nome').unmark({
      done: function () {
        $('.categoria-nome').mark(keyword);
      }
    });
  });

  $('#input-pesquisar-tag').on('input', ev => {
    let keyword = ev.target.value;
    pesquisarPorTag(keyword);
  });

  $('#input-pesquisar-geral')
    .on('input', function () {
      let _this = $(this);

      let textoPesquisado = removeSinaisDiacriticos(_this.val().toLowerCase());

      let cardDescription = document.getElementsByClassName('notas');

      $('.note-title').each((i, el) => {
        let textoElemento = removeSinaisDiacriticos(el.innerText.toLowerCase());

        let description = removeSinaisDiacriticos(
          cardDescription[i].innerText.toLowerCase()
        );

        let nota_id = parseInt($(el).attr('data-note-id'));

        if (
          textoElemento.includes(textoPesquisado) ||
          description.includes(textoPesquisado)
        ) {
          $('#note_card_' + nota_id)
            .removeAttr('hidden')
            .show();
        } else {
          $('#note_card_' + nota_id)
            .removeClass('d-flex')
            .attr('hidden', true)
            .hide();
        }
      });

      if (textoPesquisado.length > 0) {
        // Read the keyword
        let keyword = textoPesquisado;
        $('.note-title, .text-secondary').unmark({
          done: function () {
            $('.note-title, .text-secondary').mark(keyword);
          }
        });
      } else {
        $('.note-title, .text-secondary').unmark();
      }
    })
    .keyup(function (ev) {
      if (ev.keyCode == 13) {
        let _this = $(this);
        let textoPesquisado = _this.val();
        let myInit = { method: 'GET', mode: 'cors', cache: 'default' };
        fetch(
          config[INDEX].baseApiRestUrl + '/notes/' + textoPesquisado + '?page=1',
          myInit
        ).then(function (response) {
          if (response.status !== 200) {
            console.warn(
              'Looks like there was a problem. Status Code: ' + response.status
            );
            return;
          }
          response.json().then(function (result) {
            if (result.length > 0) {

              let content = '';

              $('#get-notes').html("");

              result.map(nota => {
                content += notas(nota, []);
              });

              $('#get-notes').append(content);

              funcoesNota();
            }
          });
        });
      }
    });

  /**
   * Adiciona os modais:
   * */

  $('body').append(
    modalCategory('Criar nova categoria', 'exampleModal', 'idButton1'),
    modalCriarNota('Criar novo Snippet', 'modalCriarNota', 'buttonCriarNota'),
    modalEditarNota('Editar Snippet', 'modalEditarNota', 'btnAlterarNota')
  );

  (function () {
    let body = document.getElementsByTagName('body')[0]; //Adiciona à tag head
    let script = document.createElement('script');
    script.src = 'https://unpkg.com/showdown/dist/showdown.min.js';
    body.appendChild(script);
  })();

  $('#description').keyup(function (ev) {
    let descricao = $(this).val();

    let converter = new showdown.Converter();

    let _html = converter.makeHtml(descricao);

    $('#visualizacao-markdown').html(_html);
  });

  //Selects 2:

  funcSelect2('#select-tags');
  funcSelect2('#gd-select-tags');

  let _selectCategoria = $('#categories_id');
  let _selectFormatacao = $('#languages');

  _selectCategoria
    .select2({
      theme: 'classic',
      width: 'resolve',
      placeholder: 'Seleleciona uma categoria'
    })
    .on('select2:select', function (e) {
      let data = e.params.data;
      let val = _selectFormatacao.find("option:contains('" + data.text + "')").val();
      _selectFormatacao.val(val).trigger('change.select2');
    });

  _selectFormatacao.select2({
    theme: 'classic',
    width: 'resolve',
    placeholder: 'Seleleciona uma opção de saída de formatação'
  });

  //Modal: Evento ao abrir o modal:
  $('#modalCriarNota').on('show.bs.modal', function (event) {
    setTimeout(() => {
      $('#note-title')
        .focus()
        .select();
    }, 500);
  });

  //FORMULÁRIO: EDITAR NOTA:
  $('#form-editar-nota').submit(function (ev) {
    ev.preventDefault();

    let nota_id = document.getElementById('nota-id').value;
    let title = this.elements['gd-title'].value;
    let description = this.elements['gd-description'].value;
    let tagsElement = document.getElementById('gd-select-tags');
    let code = document.getElementById('gd-get-note');
    let category = document.getElementById('gd-gategory');
    let language = document.getElementById('gd-language');

    // sqlite.connect(PATH_DB);

    let obj = {
      note_id: nota_id,
      note_title: title,
      note_description: description,
      note_code: code.innerText,
      note_category_id: category[category.selectedIndex].value,
      note_type_language: language[language.selectedIndex].value
    };
    alert('Nota editaca com sucesso!');
    return false;
  });

  //FORMULÁRIO: CRIAR NOTA:
  $('#formSave').submit(function (ev) {
    ev.preventDefault();

    let _this = this;

    // let description = this.elements.description.value;
    let description = $('#visualizacao-markdown').html();

    //Trabalhar com Tags:

    let arrInserTags = [];

    let tags = $('#select-tags')
      .select2('data')
      .map(function (el) {
        // let rows = sqlite.run(
        //   `SELECT tag_id, COUNT(*) AS total FROM tags WHERE tag_name = ?`,
        //   [el.text.toLowerCase()]
        // );
        // //Adicionar uma nova chave ao array
        // let result = rows.map(elm => {
        //   elm.text = el.text.toLowerCase();
        //   return elm;
        // });
        // //Caso Já exista
        // if (rows[0].total > 0) {
        //   arrInserTags.push(result[0]);
        // } else {
        //   // Se não existir
        //   let last_insert_id = sqlite.run('INSERT INTO tags (tag_name) VALUES (?)', [
        //     el.text.toLowerCase()
        //   ]);
        //   arrInserTags.push({
        //     tag_id: last_insert_id,
        //     text: el.text.toLowerCase()
        //   });
        // }
        // return el.text;
      });

    // let obj = {
    //   note_title: title,
    //   note_description: description,
    //   note_code: code,
    //   note_category_id: category.value,
    //   note_type_language: language.value
    // };

    let formData = new FormData();
    let form = document.getElementById('formSave');

    formData.append('title', form.title.value);
    formData.append('description', description);
    formData.append('code', form.code.value);
    formData.append('category', form.category.value);
    formData.append('formatacao-language', form['formatacao-language'].value);

    fetch(config[INDEX].baseApiRestUrl + '/notes', {
      method: 'POST',
      body: formData
    }).then(response => {
      console.log(response);
    });

    _this.reset(); //limpa o formulário

    alert('Nota criada com sucesso!'); //Cria uma nota

    carregarCategorias(); //Carrega as categoriasa

    //Insere as tags:
    /*arrInserTags.map(el => {
      sqlite.connect(PATH_DB);
      let last_insert_id = sqlite.run(
        `INSERT INTO note_tag (nt_note_fk_id, nt_tag_fk_id) VALUES (?, ?);`,
        [obj.note_id, el.tag_id]
      );
    });*/
    return false;
  });

  carregarCategorias();

  let isDetailOpen = true;

  $('#collapse-snippets').click(function () {
    if (!isDetailOpen) {
      $(this)
        .html('visibility_off')
        .attr('title', 'Desdobrar tudo...');
      isDetailOpen = true;
    } else {
      $(this)
        .html('visibility')
        .attr('title', 'Expandir tudo...');
      isDetailOpen = false;
    }
    $('details').attr('open', isDetailOpen);
  });
}); //Fim: $(document).ready
