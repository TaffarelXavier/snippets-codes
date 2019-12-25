function selectOptionByValue(selectElement, value) {
  var options = selectElement.options;
  for (var i = 0, optionsLength = options.length; i < optionsLength; i++) {
    if (options[i].value == value) {
      selectElement.selectedIndex = i;
      return true;
    }
  }
  return false;
}

var mediaQuery = () => {
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

window.onresize = function() {
  console.log(mediaQuery());
};

/**
 *
 */
function funcoesNota() {
  //Editar Nota
  $('.editar-nota').click(function() {
    var {
      note_id,
      note_title,
      note_description,
      note_tags,
      note_type_language,
      category_id,
      type_language
    } = JSON.parse($(this).attr('data-nota'));

    var categoriaElement = document.getElementById('gd-gategory'),
      linguagemFormatacaoElement = document.getElementById('gd-language'),
      tagsElement = document.getElementById('gd-select-tags');

    var tags = document.getElementById(`tags_${note_id}`).value;

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

    var editor = ace.edit(document.getElementById(`note_${note_id}`));

    $('#gd-get-note')
      .html(escapeHtml(editor.getValue()))
      .addClass(note_type_language);

    $('#nota-id').val(note_id);

    $('pre code').each(function(i, e) {
      hljs.highlightBlock(e);
    });
  });

  //Para copiar uma nota:
  $('.copiar').each(function(index, element) {
    $(this).click(function(ev) {
      let note_id = $(this).attr('data-id');

      var editor = ace.edit(document.getElementById(`note_${note_id}`));

      //beautify.beautify(editor.session);

      var beautify = ace.require('ace/ext/beautify'); // get reference to extension
      beautify.beautify(editor.session);

      //Copiar o código

      var options = {
        content: 'Código copiado com sucesso!', // text of the snackbar
        style: 'toast', // add a custom class to your snackbar
        timeout: 2000 // time in milliseconds after the snackbar autohides, 0 is disabled
      };

      $.snackbar(options);
    });
  });

  //Ace Editor
  $('.editor').each(function(i, el) {
    var _this = $(this);

    let { lang_name } = JSON.parse(_this.attr('data-note'));

    var editor = ace.edit(el, {
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

  $('.open-code').click(function() {
    var _this = $(this);

    let { note_id } = JSON.parse(_this.attr('data-nota'));
  });

  //Exluir nota:
  $('.excluir-nota').click(function() {
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

  $('.tag').click(function(ev) {
    let keyword = ev.target.innerText;
    $('#input-pesquisar-tag').val(keyword);
    pesquisarPorTag(keyword);
  });
}

/**
 *
 * @param {*} keyword
 */
function pesquisarPorTag(keyword) {
  if (keyword.length > 0) {
    var tags = $('.tag');
    $('.notas')
      .removeClass('d-flex')
      .attr('hidden', true)
      .hide();
    for (var k = 0; k < tags.size(); k++) {
      if (tags[k].innerText.toUpperCase() == keyword.toUpperCase()) {
        var note_id = tags[k].getAttribute('data-note-id');
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
 * Função para Buscar notas por categoria_id
 * */
function getNotesByCategoryId(category_id, callback) {
  var myInit = { method: 'GET', mode: 'cors', cache: 'default' };

  fetch(
    config[INDEX].baseApiRestUrl + '/notes-por-category-id/' + parseInt(category_id),
    myInit
  ).then(function(response) {
    if (response.status !== 200) {
      console.warn('Looks like there was a problem. Status Code: ' + response.status);
      return;
    }
    response.json().then(function(result) {
      callback(result);
    });
  });
}

/**
 * Carrega todos os Snippets
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

/**
 *
 */
function carregarCategorias() {
  var myInit = { method: 'GET', mode: 'cors', cache: 'default' };

  fetch(config[INDEX].baseApiRestUrl + '/categories', myInit)
    .then(function(response) {
      if (response.status !== 200) {
        console.warn('Looks like there was a problem. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(result) {
        var rows = document.getElementById('category');

        rows.innerHTML = '';

        result.sort((a, b) => {
          return a.category_order - b.category_order;
        });

        result.map(row => {
          //Destructing
          let { category_id, category_name, category_icon } = row;
          //INÍCIO - BUSCA CATEGORIAS

          var item = document.createElement('li');

          //Ao clicar em alguma categoria:::
          item.onclick = function(ev) {
            
            if (mediaQuery() == 'xs') {
              const drawer = mdc.drawer.MDCDrawer.attachTo(
                document.querySelector('.mdc-drawer')
              );
              const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(
                document.querySelector('.mdc-top-app-bar')
              );
              drawer.open = !drawer.open;
              topAppBar.listen('MDCTopAppBar:nav', () => {
                drawer.open = !drawer.open;
              });
            }

            $('#painel-termo-filtrado').removeAttr('hidden');

            let category = JSON.parse($(this).attr('data-category'));

            window.location.href = '#termo-filtrado';

            $('#termo-filtrado').html(
              `TERMO FILTRADO: <div 
              style="background:url('${category.category_icon}') no-repeat;background-size: 100% 100%;
              background-attachment: scroll;"
               class="termo-filtrado-icone"></div>` +
                category.category_name.trim().toUpperCase()
            );

            $('#esqueleto').removeAttr('hidden');

            $('.list-group-item').removeClass(
              'list-group-item-action list-group-item-success'
            );

            $(this).addClass(
              'list-group-item-action list-group-item-success',
              'disabled'
            );

            //Busca as 10 primeiras notas pelo ID de uma categoria
            getNotesByCategoryId(category_id, function(res) {
              $('#get-notes').html('');

              let content = '';

              res.map(nota => {
                content += notas(nota, []);
              });

              $('#get-notes').html(content);

              funcoesNota();

              if (res.length > 0) {
                $('#esqueleto').attr('hidden', true);
              }
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
          };

          const ICON_PADRAO =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAAAAACpleexAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfjDBMUJR7SizDUAAAAJElEQVQ4y2M4QyRgGFU4qnBkKbxw8eLNixcHtxtHFY4qHAoKAWtc+2KAiEgvAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTEyLTIwVDA1OjM3OjMwKzA5OjAwhGs2fQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0xMi0yMFQwNTozNzozMCswOTowMPU2jsEAAAAASUVORK5CYII=';

          //Adiciona classes às categorias:
          $(item)
            .addClass('list-group-item justify-content-between')
            .css({ borderBottom: '1px dashed #ccc', padding: '0px !important' })
            .html(
              `<span class="categoria-nome">
              <img style="margin:0;position: relative;top:-1px; width:40px;height: 40px;"
               src="${ICON_PADRAO}" alt="${category_icon.trim()}" data-src='${
                category_icon != null ? category_icon.trim() : ICON_PADRAO
              }' class="lazy" /> <!---->
              ${category_name.toUpperCase()}</span>
   <span class='badge badge-primary badge-pill' style="float:right;position:relative;top:-10px;margin:0">${
     row.total
   }</span>`
            )
            .attr('data-category', JSON.stringify(row))
            .attr('title', category_name.toUpperCase());

          rows.appendChild(item);

          setTimeout(function() {
            var lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

            if (
              'IntersectionObserver' in window &&
              'IntersectionObserverEntry' in window &&
              'intersectionRatio' in window.IntersectionObserverEntry.prototype
            ) {
              let lazyImageObserver = new IntersectionObserver(function(
                entries,
                observer
              ) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    let lazyImage = entry.target;

                    lazyImage.src = lazyImage.dataset.src;

                    lazyImage.classList.remove('lazy');

                    lazyImageObserver.unobserve(lazyImage);
                  }
                });
              });

              lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
              });
            }
          }, 500);
          //FIM - BUSCA CATEGORIAS
        });
      });
    })
    .catch(function(err) {
      console.error('Fetch Error :-S', err);
    });
}

function mergeArrayWithDiff(arrayA, arrayB) {
  var result = [...arrayA, ...arrayB].reduce((acc, item) => {
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
    var rows = document.getElementById('gd-get-categories');

    var arrayA = Category.getCategorieWithCountNotes();

    var arrayB = Category.all();

    arrayB = arrayB.map(el => {
      el.count = 0;
      return el;
    });

    var result = mergeArrayWithDiff(arrayA, arrayB);

    result.map(category => {
      var cat = Category.getCategorieWithCountNotes();

      var item = document.createElement('li');

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

    $('.remove-category').click(function() {
      /*var { category_id, count } = JSON.parse($(this).attr('data-category'));

            let options = {
                type: 'question',
                buttons: ['Não', 'Sim'],
                title: 'Deseja realmente excluir esta categoria?',
                message: 'Esta operação não poderá ser revertida.',
                detail: 'Algum detalhe aqui',
                defaultId: 0,
                cancelId: -1
            };

            remote.dialog.showMessageBox(win, options, response => {
                if (response == 1) {
                    if (count > 0) {
                        alert('Operação não permitida, porque há notas relacionadas a esta categoria.');
                    } else {
                        Category.delete(category_id);
                        $(`#category__${category_id}`).remove();
                        carregarCategorias();
                    }
                }
            });*/
    });
  }, 1000);
}

// Pode usar o jQuery normalmente agora.
$(document).ready(function() {
  loadTodosSnippets();
  //carregarTodasCategoria();

  //Carregar as linguagens:

  // Tag.all().map(({ tag_name }) => {
  //   $("#datalist-languages").append(
  //     `<option value='${tag_name.toUpperCase()}' />`
  //   );
  // });

  //Abre o modal de categorias:
  $('#abrir-modal-criador-categoria').click(function() {
    setTimeout(function() {
      $('#category-name')
        .focus()
        .select();
    }, 500);
  });

  /**
    Pesquisar Categorias:
    */
  $('#categoria').keyup(function() {
    let _value = $(this);

    var keyword = removeSinaisDiacriticos(_value.val().toLowerCase());

    let categories = document.getElementById('category').childNodes;

    for (let k = 0; k < categories.length; k++) {
      var textoArray = removeSinaisDiacriticos(categories[k].title.toLowerCase());

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
      done: function() {
        $('.categoria-nome').mark(keyword);
      }
    });
  });

  $('#input-pesquisar-tag').on('input', ev => {
    var keyword = ev.target.value;
    pesquisarPorTag(keyword);
  });

  $('#input-pesquisar-geral').on('input', function() {
    var _this = $(this);

    var textoPesquisado = removeSinaisDiacriticos(_this.val().toLowerCase());

    var cardTitle = document.getElementsByClassName('card-description');

    $('.note-title').each((i, el) => {
      var textoElemento = removeSinaisDiacriticos(el.innerText.toLowerCase());

      var description = removeSinaisDiacriticos(cardTitle[i].innerText.toLowerCase());

      var nota_id = parseInt($(el).attr('data-note-id'));

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
      var keyword = textoPesquisado;
      $('.note-title, .card-description').unmark({
        done: function() {
          $('.note-title, .card-description').mark(keyword);
        }
      });
    } else {
      $('.note-title, .card-description').unmark();
    }
  });

  /**
   * Adiciona os modais:
   * */

  $('body').append(
    modalCategory('Criar nova categoria', 'exampleModal', 'idButton1'),
    modalCriarNota('Criar nova nota', 'modalCriarNota', 'buttonCriarNota'),
    modalEditarNota('Editar Nota', 'modalEditarNota', 'btnAlterarNota')
  );

  //Select: categoria
  $('#categories_id').change(function(ev) {
    let linguagem = $(this)
      .find('option:selected')
      .text()
      .toUpperCase();

    var languages = [].slice.call(document.getElementById('languages'));

    var index = languages.findIndex(fruit => {
      return fruit.label.toUpperCase() == linguagem;
    });
    //Seleciona o valor:
    document.getElementById('languages').selectedIndex = index;
  });

  //Selects 2:

  funcSelect2('#select-tags');
  funcSelect2('#gd-select-tags');

  //Modal: Evento ao abrir o modal:
  $('#modalCriarNota').on('show.bs.modal', function(event) {
    setTimeout(() => {
      $('#note-title')
        .focus()
        .select();
    }, 500);
  });

  /**
   * Criar Categoria
   */
  // $('#idButton1').click(function() {
  //   let categoryName = $('#category-name')
  //     .val()
  //     .trim();
  //   if (categoryName != '') {
  //    /* var category = Category.create(categoryName.toUpperCase());

  //     // if (lastId > 0) {
  //     alert('Categoria criada com sucesso!');

  //     var languages = document.getElementsByName('languages');

  //     $(languages).append(
  //       `<option value='${category.last_id}'>${categoryName.toUpperCase()}</option>`
  //     );
  //     //}*/
  //   }
  // });

  $('#form-category').submit(function(ev) {
    //ev.preventDefault();
    //return false;
  });

  //EDITAR NOTA:
  $('#form-editar-nota').submit(function(ev) {
    ev.preventDefault();

    let nota_id = document.getElementById('nota-id').value;
    let title = this.elements['gd-title'].value;
    let description = this.elements['gd-description'].value;
    let tagsElement = document.getElementById('gd-select-tags');
    let code = document.getElementById('gd-get-note');
    let category = document.getElementById('gd-gategory');
    let language = document.getElementById('gd-language');

    // sqlite.connect(PATH_DB);

    var obj = {
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

  //CRIAR NOTA:
  $('#formSave').submit(function(ev) {
    ev.preventDefault();

    let _this = this;

    let title = this.elements.title.value;

    let description = this.elements.description.value;

    let code = this.elements.code.value;

    let category = this.elements.category[this.elements.category.selectedIndex];

    let language = this.elements['formatacao-language'][
      this.elements['formatacao-language'].selectedIndex
    ];

    //Trabalhar com Tags:

    var arrInserTags = [];

    let tags = $('#select-tags')
      .select2('data')
      .map(function(el) {
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
        //   var last_insert_id = sqlite.run('INSERT INTO tags (tag_name) VALUES (?)', [
        //     el.text.toLowerCase()
        //   ]);
        //   arrInserTags.push({
        //     tag_id: last_insert_id,
        //     text: el.text.toLowerCase()
        //   });
        // }
        // return el.text;
      });

    var obj = {
      note_title: title,
      note_description: description,
      note_code: code,
      note_category_id: category.value,
      note_type_language: language.value
    };

    var formData = new FormData(document.getElementById('formSave'));

    fetch(config[INDEX].baseApiRestUrl + '/notes', {
      method: 'POST',
      body: formData
    }).then(response => {
      //console.log(response);
    });

    _this.reset(); //limpa o formulário

    alert('Nota criada com sucesso!'); //Cria uma nota

    carregarCategorias(); //Carrega as categoriasa

    //Insere as tags:
    /*arrInserTags.map(el => {
      sqlite.connect(PATH_DB);
      var last_insert_id = sqlite.run(
        `INSERT INTO note_tag (nt_note_fk_id, nt_tag_fk_id) VALUES (?, ?);`,
        [obj.note_id, el.tag_id]
      );
    });*/
    return false;
  });

  function getAllNotes() {
    let rows = sqlite.run(
      `SELECT * FROM notes AS t1 JOIN languages AS t2
    ON t1.note_type_language = t2.lang_id ORDER BY t1.created_at DESC;`
    );

    sqlite.close();

    return rows;
  }

  // var options = {
  //   content: 'Some text', // text of the snackbar
  //   style: 'toast', // add a custom class to your snackbar
  //   timeout: 1000 // time in milliseconds after the snackbar autohides, 0 is disabled
  // };

  // $.snackbar(options);

  let conteudo = ``;

  //Carregar notas
  // var notes = getAllNotes();

  // if (notes.length > 0) {
  //   getAllNotes().map(data => {
  //     sqlite.connect(PATH_DB);

  //     let rows = sqlite.run(
  //       `SELECT tag_id, tag_name FROM tags AS t1 JOIN note_tag AS t2 ON t1.tag_id = t2.nt_tag_fk_id WHERE t2.nt_note_fk_id = ?`,
  //       [data.note_id]
  //     );

  //     conteudo += notas(data, rows);

  //     sqlite.close();
  //   });

  //   $("#get-notes").html(conteudo);

  // $('#sem-notas').removeAttr('hidden');

  //$('#esqueleto').attr('hidden', true);

  funcoesNota();
  // }

  carregarCategorias();

  $('#tela-inicial').click(function() {
    $('#get-notes').html(conteudo);
    funcoesNota();
  });
}); //Fim: $(document).ready
