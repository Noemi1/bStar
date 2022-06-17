import { BehaviorSubject } from "rxjs";
import * as $ from 'jquery';
import { FilterMatchMode, PrimeNGConfig } from "primeng/api";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable({
	providedIn: 'root'
})
export class TableService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectedItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  selected: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

  constructor(private toastr: ToastrService) {

  }

  initialize() {
    this.resetSelection();
    this.toggle_row_menu();
    this.filter_position_on_table_scroll();
    this.filter_toggle();
  }
  onRowSelect(data: any) {
    var row: any = data.data;
    if (row != undefined) {
      this.selected.next(row);
      var index = this.selectedItems.value.findIndex(n => n.id == row.id);
      if (index == -1) {
        var selectedItems = this.selectedItems.value;
        selectedItems.push(row);
        this.selectedItems.next(selectedItems);
      }
    }
  }

  onRowUnselect(row: any) {
    var index = this.selectedItems.value.findIndex(n => n.id == row.id);
    var selectedItems = this.selectedItems.value;
    if (index != -1) {
      selectedItems.splice(index, 1);
      this.selectedItems.next(selectedItems);
    }
    if (selectedItems.length > 0)
      this.selected.next(selectedItems[selectedItems.length - 1])
    else {
      this.selected.next(undefined)
      this.close_row_menu();
    }
  }

  close_row_menu() {
    var tr = $('tr.selected');
    var tableParent = $(tr).parents('table').parent('div');
    $('.actions__nav').animate({
      top: 0,
      left: 0,
      opacity: 0,
      visibility: 'hidden',
    }, 0, () => {
      $('.actions__nav').removeClass('active')
    });
  }

  resetSelection() {
    if (this.selected.value)
      this.onRowUnselect(this.selected.value)
    else {
      this.close_row_menu();
      this.selected.next(undefined)
    }
    this.selectedItems.next([]);
  }
	copiarLinha(cols: string[], item: object) {
		this.copiarLinhas(cols, Array.of(item));
	}

	async copiarLinhas(cols: string[], items: object[]) {
		let rows: string[] = [];
		for (let item of items) {
			var cels: string[] = [];
			for (let [key, value] of Object.entries(item)) {
				cels.push(value);
			}
			const excelData = cels.join('\t');
			rows.push(excelData);
		}

		const excelColumns = cols.join('\t');
		const excelRows = rows.join('\n');
		var copy = [excelColumns, excelRows].join('\n');

		try {
			if (navigator.clipboard) {
				await navigator.clipboard.writeText(copy);
				await navigator.clipboard.readText()
					.then(clipText => {
						return copy;
					})
				this.toastr.success('Copiado')
			} else {
				this.toastr.error('Não é possível copiar. Altere as permissões do seu navegador ou tente Ctrl + C.')
			}
		} catch (err) {
			console.error(err);
			this.toastr.error('Não é possível copiar. Altere as permissões do seu navegador.')
		}
	}


	filter_position_on_table_scroll() {
		$('.p-datatable-wrapper').each(function () {
			$(this).off('scroll');
			$(this).on('scroll', function () {
				var form_open = $(`.filter-menu[data-open=true]`)
				if (form_open.length > 0) {
					var position = setFilterPosition();
					form_open.animate({
						left: position.left,
						top: position.top,
					}, 0);
				}
			})
		});
	}


	filter_toggle() {
		// $(document).on('mouseenter', '.btn.p-column-filter-menu-button', function (e) {
		//   var attr = $(this).data('name')
		//   var form = $(`.filter-menu[data-name=${attr}]`)
		//   var form_attr = form.attr('data-open')?.toString() ?? 'false';
		//   var filterOpen = !(form_attr == 'true');
		//   $('.filter-menu').not(form).toggle(false).attr('data-open', false.toString())
		//   form.attr('data-open', filterOpen.toString());
		//   form.toggle(filterOpen);
		//   var position = {top: 0, left: 0};
		// 	if($(form).parents('.modal__inner').length) {
		// 		position.top = e.clientY;
		// 		position.left = e.clientX;
		// 	} else {
		// 		position = setFilterPosition();
		// 	}

		//   form.animate({
		//     top: position.top,
		//     left: position.left,
		//   }, 0);
		// })

		$(document).on('click', '.btn.p-column-filter-menu-button', function (e) {
			var attr = $(this).data('name')
			var form = $(`.filter-menu[data-name=${attr}]`)
			var form_attr = form.attr('data-open')?.toString() ?? 'false';

      $('.btn.p-column-filter-menu-button').removeClass('open');
      $(this).toggleClass('open');

			var filterOpen = !(form_attr == 'true');
			$('.filter-menu').not(form).toggle(false).attr('data-open', false.toString())
			form.attr('data-open', filterOpen.toString());
			form.toggle(filterOpen);

			var position = setFilterPosition();
			form.animate({
				left: position.left,
				top: position.top,
			}, 0);
		});
	}


	close_filter(filter?: JQuery<HTMLElement>) {
		if (!filter) {
			filter = $('.filter-menu');
		}
		filter.toggle(false).attr('data-open', false.toString())
    var attr = $(filter).data('name')
    $(`.btn.p-column-filter-menu-button[data-name=${attr}]`).removeClass('open')
	}
	table_scroll_top(){

		$('.table').each(function() {
			let wrapperBottom = $(this).find('.p-datatable-wrapper');
			let wrapperTop = $(this).find('.table-wrapper-top');

			let tableWidth = wrapperBottom.find('table').width() ?? 0;
			wrapperTop.find('.table-wrapper-top-div').width(tableWidth);

			wrapperTop.off('scroll');
			wrapperTop.on('scroll', function() {
				wrapperBottom.scrollLeft(wrapperTop.scrollLeft() ?? 0);
			});

			wrapperBottom.off('scroll');
			wrapperBottom.on('scroll', function() {
				wrapperTop.scrollLeft(wrapperBottom.scrollLeft() ?? 0);
			});

		});

	}

	toggle_row_menu() {
		$(document).off('click', 'tr');
		$(document).on('click', 'tr', function (e) {
			var tr = $('tr.selected');
			var tableParent = $(this).parents('table').parent('.p-datatable-wrapper');
			if (tr.length > 0) {
				$('.actions__nav').animate({
					top: (tr.offset()?.top ?? 0) - (tr.height() ?? 0),
					left: (tableParent.width() ?? 0),
					opacity: 1,
					visibility: 'visible',
				}, 0, () => {
					$('.actions__nav').addClass('active')
				})
			} else {
				$('.actions__nav').animate({
					top: 0,
					left: 0,
					opacity: 0,
					visibility: 'hidden',
				}, 0, () => {
					$('.actions__nav').removeClass('active')
				})
			}
		})
	}




}
export function setFilterPosition() {
	var top = 0;
	var left = 0;
	var form_open = $(`.filter-menu[data-open=true]`);
	if (form_open.length > 0) {
		var attr = form_open.attr('data-name')
		var btn = $(`.p-column-filter-menu-button[data-name=${attr}]`);
		// var th = $(btn).parent('th');
    // $(`th[data-name=${attr}]`);
		var tr = $(btn).parent('th').parent('tr');
		var tableParent = tr.parents('table').parent('.p-datatable-wrapper');

		top = (tr.offset()?.top ?? 0) - (tr.height() ?? 0) + (tr.parents('.modal__inner').position()?.top ?? 0);
		left = (btn.offset()?.left ?? 0);


		var wrapper = { from: tableParent.offset()?.left ?? 0, to: (tableParent.width() ?? 0) + (tableParent.offset()?.left ?? 0) }
		var divPosition = { from: left - (form_open.width() ?? 0), to: (form_open.width() ?? 0) + left }

		if (divPosition.from < wrapper.from) {
			left -= (divPosition.from)
		}

		if (tr.parents('.modal__inner').length == 1) {
			top = (tr.offset()?.top ?? 0) + (tr.parents('.modal__inner').offset()?.top ?? 0) + (tr.parents('.modal__inner').scrollTop() ?? 0) + 10;
			left += (tr.parents('.modal__inner').offset()?.left ?? 0)
		}
	}
	return { top: top, left: left }
}
export class TableCols {
  title: string = '';
  field: string = '';
  filterType: string = 'text';
  maskType: MaskType = MaskType.none;
}

export enum MaskType {
  money = 'money',
  date = 'date',
  dateTime = 'dateTime',
  none = 'none',
  decimal = 'decimal',
}
