import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NodeSelectEventArgs, Sidebar, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SidebarService } from '../core/services/sidebar.service';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.scss'],
})
export class LayoutManagerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  @ViewChild('sidebar') sidebar!: Sidebar;
  @ViewChild('sidebarTree') treeView!: TreeViewComponent;
  public field: any;
  mediaQuery: object = window.matchMedia(`(min-width: ${environment.mediaBreak}px )`);
  public width: string = '265px';

  constructor(private router: Router, private actRoute: ActivatedRoute, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationStart)).subscribe((event: any) => {
      // You only receive NavigationStart events
    });

    this.sidebarService
      .onSidebarLinks()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((links: any) => {
        this.field = { dataSource: links, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon' };
      });
  }
  public onCreated(args: any) {
    this.sidebar.element.style.visibility = '';
  }

  toggleClick() {
    this.sidebar.toggle();
  }
  closeClick() {
    this.sidebar.hide();
  }

  public loadRoutingContent(args: NodeSelectEventArgs): void {
    let data: any = this.treeView.getTreeData(args.node);
    let routerLink: string = data[0].url;
    this.router.navigate([routerLink]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
