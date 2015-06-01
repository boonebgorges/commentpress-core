CommentPress.textselector=new function(){var e=this,t=jQuery.noConflict();"undefined"!=typeof CommentpressTextSelectorSettings&&(this.popover=CommentpressTextSelectorSettings.popover),this.init=function(){e.listeners()},this.dom_ready=function(){var n;e.selection_build_for_comments(),n='<input type="hidden" name="text_selection" id="text_selection" value="" />',t(n).appendTo("#commentform"),t(e.popover).appendTo("body"),e.highlighter_activate(),t(".popover-holder").mousedown(function(){return!1}),t(".popover-holder-btn-left-comment").click(function(){var n,o;return t(".popover-holder").hide(),e.selection_active_set(),n=e.container_get(),e.selection_save_for_textblock(n),e.selection_send_to_editor(!1),t.scroll_comments(t("#respond"),cp_scroll_speed),o=t("#"+n).wrapSelection({fitToWord:!1}).addClass("inline-highlight"),!1}),t(".popover-holder-btn-left-quote").click(function(){var n,o;return t(".popover-holder").hide(),e.selection_active_set(),n=e.container_get(),e.selection_save_for_textblock(n),e.selection_send_to_editor(!0),t.scroll_comments(t("#respond"),cp_scroll_speed),o=t("#"+n).wrapSelection({fitToWord:!1}).addClass("inline-highlight"),!1}),t(".popover-holder-btn-right").click(function(){t(".popover-holder").hide();var n="";return e.container_set(n),!1}),t("#container").on("mousedown",".textblock",function(){}),t("#container").on("click",".textblock",function(){var n,o;o=e.container_get(),n=t(this).prop("id"),o!=n&&(e.container_set(n),e.highlights_clear())}),t("#comments_sidebar").on("mouseenter","li.comment.selection-exists",function(n){var o,i;"block"!=t(".popover-holder").css("display")&&(e.selection_active_get()||(o=t(this).prop("id"),i=o.split("-")[2],e.selection_recall_for_comment(i)))}),t("#comments_sidebar").on("mouseleave","li.comment.selection-exists",function(n){"block"!=t(".popover-holder").css("display")&&(e.selection_active_get()||e.highlights_clear())})},this.listeners=function(){t(document).on("commentpress-document-ready",function(t){e.init()}),t(document).on("commentpress-ajax-comment-added",function(t,n){n.match("#comment-")&&(n=parseInt(n.split("#comment-")[1])),e.selection_save_for_comment(n),e.selection_clear_from_editor()}),t(document).on("commentpress-ajax-comment-added-scrolled",function(t){e.highlights_clear(),e.selection_active_clear()}),t(document).on("commentpress-commenticonbox-clicked commentpress-link-in-textblock-clicked",function(t){e.highlights_clear(),e.selection_active_clear(),e.selection_clear()})},this.container="",this.container_set=function(e){this.container=e},this.container_get=function(){return this.container},this.selection_get=function(){return this.selection_get_current(document.getElementById(e.container))},this.selection_clear=function(){window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():document.selection&&document.selection.empty()},this.selection_active=!1,this.selection_active_set=function(){e.selection_active=!0,t(document).bind("click",e.selection_active_handler)},this.selection_active_get=function(){return this.selection_active},this.selection_active_clear=function(){this.selection_active=!1,t(document).unbind("click",e.selection_active_handler)},this.selection_active_handler=function(n){t(n.target).closest("#commentform").length||(e.highlighter_deactivate(),e.highlighter_activate(),e.selection_active_clear(),e.highlights_clear())},this.selections_by_comment={},this.selection_sent={},this.selection_build_for_comments=function(){t("#comments_sidebar li.selection-exists").each(function(n){var o,i,c,s,l,r,a;o=t(this).prop("id"),i=o.split("-")[2],c="#comment-"+i,s=t(this).attr("class").split(/\s+/),t.each(s,function(t,n){n.match("sel_start-")&&(l=parseInt(n.split("sel_start-")[1])),n.match("sel_end-")&&(r=parseInt(n.split("sel_end-")[1])),a={start:l,end:r},e.selections_by_comment[c]=a})})},this.selection_save_for_comment=function(t){var n="#comment-"+t,o=e.selection_sent;this.selections_by_comment[n]=o,e.selection_sent={}},this.selection_recall_for_comment=function(n){var o,i,c,s;s="#comment-"+n,s in this.selections_by_comment&&(o=this.selections_by_comment[s],i=t.get_text_sig_by_comment_id(s),c="textblock-"+i,e.selection_restore(document.getElementById(c),o),t("#"+c).wrapSelection({fitToWord:!1}).addClass("inline-highlight"))},this.selections_by_textblock={},this.selection_save_for_textblock=function(t){var n=e.selection_get_current(document.getElementById(t));t in this.selections_by_textblock||(this.selections_by_textblock[t]=[]),this.selections_by_textblock[t].push(n)},this.selection_recall_for_textblock=function(n){if(n in this.selections_by_textblock)for(var o,i=0;o=this.selections_by_textblock[n][i++];)e.selection_restore(document.getElementById(n),o),t("#"+n).wrapSelection({fitToWord:!1}).addClass("inline-highlight")},window.getSelection&&document.createRange?(this.selection_get_current=function(e){var t,n,o;return t=window.getSelection().getRangeAt(0),n=t.cloneRange(),n.selectNodeContents(e),n.setEnd(t.startContainer,t.startOffset),o=n.toString().length,{text:t.toString(),start:o,end:o+t.toString().length}},this.selection_restore=function(e,t){var n,o,i=0,c=document.createRange(),s=[e],l=!1,r=!1;for(c.setStart(e,0),c.collapse(!0);!r&&(n=s.pop());)if(3==n.nodeType){var a=i+n.length;!l&&t.start>=i&&t.start<=a&&(c.setStart(n,t.start-i),l=!0),l&&t.end>=i&&t.end<=a&&(c.setEnd(n,t.end-i),r=!0),i=a}else for(var _=n.childNodes.length;_--;)s.push(n.childNodes[_]);o=window.getSelection(),o.removeAllRanges(),o.addRange(c)}):document.selection&&document.body.createTextRange&&(this.selection_get_current=function(e){var t,n,o;return t=document.selection.createRange(),n=document.body.createTextRange(),n.moveToElementText(e),n.setEndPoint("EndToStart",t),o=n.text.length,{text:t.text,start:o,end:o+t.text.length}},this.selection_restore=function(e,t){var n;n=document.body.createTextRange(),n.moveToElementText(e),n.collapse(!0),n.moveEnd("character",t.end),n.moveStart("character",t.start),n.select()}),this.selection_send_to_editor=function(n){var o;t(document).unbind("click",e.highlighter_active_handler),o=e.selection_get(),t("#text_selection").val(o.start+","+o.end),e.selection_sent=o,n?"1"==cp_tinymce?t("#wp-comment-wrap").hasClass("html-active")?e.selection_add_to_textarea(o.text,"replace"):e.selection_add_to_tinymce(o.text,"replace"):e.selection_add_to_textarea(o.text,"replace"):"1"==cp_tinymce?t("#wp-comment-wrap").hasClass("html-active")?setTimeout(function(){t("#comment").focus()},200):setTimeout(function(){tinymce.activeEditor.focus()},200):setTimeout(function(){t("#comment").focus()},200)},this.selection_clear_from_editor=function(){t("#text_selection").val("")},this.selection_add_to_textarea=function(e,n){"prepend"==n?content=t("#comment").val():content="",setTimeout(function(){t("#comment").val("<strong>["+e+"]</strong>\n\n"+content),t("#comment").focus()},200)},this.selection_add_to_tinymce=function(e,t){"prepend"==t?content=tinymce.activeEditor.getContent():content="",tinymce.activeEditor.setContent("<p><strong>["+e+"]</strong></p>"+content,{format:"html"}),setTimeout(function(){tinymce.activeEditor.selection.select(tinymce.activeEditor.getBody(),!0),tinymce.activeEditor.selection.collapse(!1),tinymce.activeEditor.focus()},200)},this.highlighter_activate=function(){t(".textblock").highlighter({selector:".popover-holder",minWords:1,complete:function(n){t(document).bind("click",e.highlighter_active_handler)}})},this.highlighter_deactivate=function(){t(".textblock").highlighter("destroy")},this.highlighter_active_handler=function(n){t(n.target).closest(".popover-holder").length||(t(document).unbind("click",e.highlighter_active_handler),e.highlighter_deactivate(),e.highlighter_activate())},this.highlights_clear=function(){t(".inline-highlight").each(function(e){var n=t(this).contents();t(this).replaceWith(n)})}},CommentPress.textselector.init(),jQuery(document).ready(function(e){CommentPress.textselector.dom_ready()});