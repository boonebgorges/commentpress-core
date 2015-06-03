CommentPress.textselector=new function(){var a=this,b=jQuery.noConflict();this.localisation=new Array;if("undefined"!==typeof CommentpressTextSelectorSettings){this.localisation=CommentpressTextSelectorSettings.localisation}this.localisation_set=function(c){this.localisation=c};this.localisation_get=function(c){if(c in this.localisation){return this.localisation[c]}return""};this.init=function(){};this.dom_ready=function(){a.listeners()};this.saved_scroll_target="";this.listeners=function(){b(document).on("commentpress-document-ready",function(c){a.setup()});b(document).on("commentpress-ajax-comment-added",function(d,c){if(c.match("#comment-")){c=parseInt(c.split("#comment-")[1])}CommentPress.textselector.textblocks.selection_save_for_comment(c);CommentPress.textselector.commentform.current_selection_clear();CommentPress.textselector.commentform.focus_clear()});b(document).on("commentpress-ajax-comment-added-scrolled",function(c){a.highlights_clear_all()});b(document).on("commentpress-textblock-pre-align commentpress-comment-block-permalink-pre-align commentpress-commenticonbox-pre-align commentpress-link-in-textblock-pre-align",function(c){if(CommentPress.textselector.commentform.focus_is_active()){if(CommentPress.textselector.commentform.comment_content_exists()){a.saved_scroll_target=CommentPress.settings.textblock.get_scroll_target();CommentPress.settings.textblock.set_scroll_target("none")}}});b(document).on("commentpress-textblock-click commentpress-comment-block-permalink-clicked commentpress-commenticonbox-clicked commentpress-link-in-textblock-clicked",function(c){if(CommentPress.textselector.commentform.focus_is_active()){if(CommentPress.textselector.commentform.comment_content_exists()){CommentPress.settings.textblock.set_scroll_target(a.saved_scroll_target);b(document).click()}}})};this.setup=function(){CommentPress.textselector.textblocks.setup();CommentPress.textselector.comments.setup()};this.selection_get=function(c){return a.selection_get_current(document.getElementById(c))};this.selection_clear=function(){if(window.getSelection){if(window.getSelection().empty){window.getSelection().empty()}else{if(window.getSelection().removeAllRanges){window.getSelection().removeAllRanges()}}}else{if(document.selection){document.selection.empty()}}};if(window.getSelection&&document.createRange){this.selection_get_current=function(f){var d,c,e;d=window.getSelection().getRangeAt(0);c=d.cloneRange();c.selectNodeContents(f);c.setEnd(d.startContainer,d.startOffset);e=c.toString().length;return{text:d.toString(),start:e,end:e+d.toString().length}};this.selection_restore=function(d,f){var c=0,l=document.createRange(),k=[d],g,h=false,n=false,e;l.setStart(d,0);l.collapse(true);while(!n&&(g=k.pop())){if(g.nodeType==3){var m=c+g.length;if(!h&&f.start>=c&&f.start<=m){l.setStart(g,f.start-c);h=true}if(h&&f.end>=c&&f.end<=m){l.setEnd(g,f.end-c);n=true}c=m}else{var j=g.childNodes.length;while(j--){k.push(g.childNodes[j])}}}e=window.getSelection();e.removeAllRanges();e.addRange(l)}}else{if(document.selection&&document.body.createTextRange){this.selection_get_current=function(f){var c,d,e;c=document.selection.createRange();d=document.body.createTextRange();d.moveToElementText(f);d.setEndPoint("EndToStart",c);e=d.text.length;return{text:c.text,start:e,end:e+c.text.length}};this.selection_restore=function(e,d){var c;c=document.body.createTextRange();c.moveToElementText(e);c.collapse(true);c.moveEnd("character",d.end);c.moveStart("character",d.start);c.select()}}}this.highlights_clear_all=function(){b(".inline-highlight").each(function(c){var d=b(this).contents();b(this).replaceWith(d)})}};CommentPress.textselector.textblocks=new function(){var a=this,b=jQuery.noConflict();if("undefined"!==typeof CommentpressTextSelectorSettings){this.popover_textblock=CommentpressTextSelectorSettings.popover_textblock}this.init=function(){};this.dom_ready=function(){};this.container="";this.container_set=function(c){this.container=c};this.container_get=function(){return this.container};this.setup=function(){a.selection_build_for_comments();a.setup_popover();a.setup_content();a.setup_comment_rollovers();CommentPress.textselector.commentform.setup();a.highlighter_activate()};this.setup_popover=function(){b(a.popover_textblock).appendTo("body");b(".popover-holder").mousedown(function(){return false});b(".popover-holder-btn-left-comment").click(function(){var c,e,d;b(".popover-holder").hide();CommentPress.textselector.commentform.focus_activate();a.selection_send_to_editor(false);CommentPress.common.comments.scroll_comments(b("#respond"),cp_scroll_speed);c=a.container_get();d=b("#"+c).wrapSelection({fitToWord:false}).addClass("inline-highlight");return false});b(".popover-holder-btn-left-quote").click(function(){var c,e,d;b(".popover-holder").hide();CommentPress.textselector.commentform.focus_activate();a.selection_send_to_editor(true);CommentPress.common.comments.scroll_comments(b("#respond"),cp_scroll_speed);c=a.container_get();d=b("#"+c).wrapSelection({fitToWord:false}).addClass("inline-highlight");return false});b(".popover-holder-btn-right").click(function(){b(".popover-holder").hide();var c="";a.container_set(c);return false})};this.setup_content=function(){b("#container").on("mousedown",".textblock",function(){if(CommentPress.textselector.commentform.focus_is_active()){return}var c;c=b(this).prop("id");a.container_set(c);a.highlighter_enable()});b("#container").on("mouseup",".textblock",function(){if(CommentPress.textselector.commentform.focus_is_active()){return}var d,c;d=a.container_get();c=b(this).prop("id");if(d!=c){a.container_set("");a.highlighter_disable()}})};this.setup_comment_rollovers=function(){b("#comments_sidebar").on("mouseenter","li.comment.selection-exists",function(e){var c,d;if(b(".popover-holder").css("display")=="block"){return}if(b(".comment-popover-holder").css("display")=="block"){return}c=b(this).prop("id");d=c.split("-")[2];a.selection_recall_for_comment(d)});b("#comments_sidebar").on("mouseleave","li.comment.selection-exists",function(c){if(b(".popover-holder").css("display")=="block"){return}if(b(".comment-popover-holder").css("display")=="block"){return}a.highlights_clear_for_comment()})};this.selection_send_to_editor=function(c){var d;b(document).unbind("click",a.highlighter_textblock_handler);d=CommentPress.textselector.selection_get(a.container_get());CommentPress.textselector.commentform.current_selection_set(d);if(c){if(cp_tinymce=="1"){if(b("#wp-comment-wrap").hasClass("html-active")){a.selection_add_to_textarea(d.text,"replace")}else{a.selection_add_to_tinymce(d.text,"replace")}}else{a.selection_add_to_textarea(d.text,"replace")}}else{if(cp_tinymce=="1"){if(b("#wp-comment-wrap").hasClass("html-active")){setTimeout(function(){b("#comment").focus()},200)}else{setTimeout(function(){tinymce.activeEditor.focus()},200)}}else{setTimeout(function(){b("#comment").focus()},200)}}};this.selection_add_to_textarea=function(d,c){if(c=="prepend"){content=b("#comment").val()}else{content=""}setTimeout(function(){b("#comment").val("<strong>["+d+"]</strong>\n\n"+content);b("#comment").focus()},200)};this.selection_add_to_tinymce=function(d,c){if(c=="prepend"){content=tinymce.activeEditor.getContent()}else{content=""}tinymce.activeEditor.setContent("<p><strong>["+d+"]</strong></p>"+content,{format:"html"});setTimeout(function(){tinymce.activeEditor.selection.select(tinymce.activeEditor.getBody(),true);tinymce.activeEditor.selection.collapse(false);tinymce.activeEditor.focus()},200)};this.highlighter_activate=function(){b(".textblock").highlighter({selector:".popover-holder",minWords:1,complete:function(c){b(document).bind("click",a.highlighter_textblock_handler)}})};this.highlighter_deactivate=function(){b(".textblock").highlighter("destroy");b(document).unbind("click",a.highlighter_textblock_handler)};this.highlighter_textblock_handler=function(c){if(!b(c.target).closest(".popover-holder").length){a.highlighter_deactivate();a.highlighter_activate()}};this.highlighter_enable=function(){b(".textblock").highlighter("enable")};this.highlighter_disable=function(){b(".textblock").highlighter("disable")};this.highlights_clear_content=function(){b(".textblock .inline-highlight").each(function(c){var d=b(this).contents();b(this).replaceWith(d)})};this.highlights_clear_for_comment=function(){b(".textblock .inline-highlight-per-comment").each(function(c){var d=b(this).contents();b(this).replaceWith(d)})};this.selections_by_comment={};this.selection_build_for_comments=function(){b("#comments_sidebar li.selection-exists").each(function(e){var d,g,f,c,k,h,j;d=b(this).prop("id");g=d.split("-")[2];f="#comment-"+g;c=b(this).attr("class").split(/\s+/);b.each(c,function(i,l){if(l.match("sel_start-")){k=parseInt(l.split("sel_start-")[1])}if(l.match("sel_end-")){h=parseInt(l.split("sel_end-")[1])}j={start:k,end:h};a.selections_by_comment[f]=j})})};this.selection_save_for_comment=function(d){var c,e;c="#comment-"+d;e=CommentPress.textselector.commentform.current_selection_get();this.selections_by_comment[c]=e;CommentPress.textselector.commentform.current_selection_clear()};this.selection_recall_for_comment=function(f){var g,e,c,d;d="#comment-"+f;if(d in this.selections_by_comment){g=this.selections_by_comment[d];e=b.get_text_sig_by_comment_id(d);c="textblock-"+e;CommentPress.textselector.selection_restore(document.getElementById(c),g);b("#"+c).wrapSelection({fitToWord:false}).addClass("inline-highlight-per-comment")}};this.selections_by_textblock={};this.selection_save_for_textblock=function(c){var d=a.selection_get_current(document.getElementById(c));if(!(c in this.selections_by_textblock)){this.selections_by_textblock[c]=[]}this.selections_by_textblock[c].push(d)};this.selection_recall_for_textblock=function(d){if(d in this.selections_by_textblock){for(var c=0,e;e=this.selections_by_textblock[d][c++];){CommentPress.textselector.selection_restore(document.getElementById(d),e);b("#"+d).wrapSelection({fitToWord:false}).addClass("inline-highlight")}}}};CommentPress.textselector.commentform=new function(){var a=this,b=jQuery.noConflict();this.init=function(){};this.dom_ready=function(){};this.setup=function(){var c;c='<input type="hidden" name="text_selection" id="text_selection" value="" />';b(c).appendTo("#commentform")};this.comment_content_exists=function(){if(cp_tinymce=="1"){if(b("#wp-comment-wrap").hasClass("html-active")){content=b("#comment").val()}else{if("undefined"!==typeof tinymce.activeEditor){content=tinymce.activeEditor.getContent()}else{content=b("#comment").val()}}}else{content=b("#comment").val()}return(content=="")?false:true};this.comment_content_clear=function(){if(cp_tinymce=="1"){if(b("#wp-comment-wrap").hasClass("html-active")){b("#comment").val("")}else{if("undefined"!==typeof tinymce.activeEditor){tinymce.activeEditor.setContent("",{format:"html"})}else{b("#comment").val("")}}}else{b("#comment").val("")}};this.selection_in_editor={};this.current_selection_set=function(c){this.selection_in_editor=c;b("#text_selection").val(c.start+","+c.end)};this.current_selection_get=function(){return this.selection_in_editor};this.current_selection_exists=function(){return b.isEmptyObject(this.selection_in_editor)?false:true};this.current_selection_clear=function(){this.selection_in_editor={};b("#text_selection").val("")};this.focus_active=false;this.focus_activate=function(){a.focus_active=true;b(document).bind("click",a.focus_active_handler)};this.focus_is_active=function(){return this.focus_active};this.focus_clear=function(){this.focus_active=false;b(document).unbind("click",a.focus_active_handler)};this.focus_active_handler=function(c){if(!b(c.target).closest("#respond").length){if(!b(c.target).closest(".comment-content").length){if(a.current_selection_exists()){if(a.comment_content_exists()){a.modal();b(document).unbind("click",a.focus_active_handler)}else{a.modal_yes()}}else{a.modal_yes()}}}};this.modal_markup={};this.modal=function(g){var f,e,c,h,d;f=CommentPress.textselector.localisation_get("dialog_title");e=CommentPress.textselector.localisation_get("dialog_content");a.modal_markup=b('<div id="dialog" title="'+f+'"><p class="cp_alert_text">'+e+"</p></div>");c=CommentPress.textselector.localisation_get("dialog_yes");h=CommentPress.textselector.localisation_get("dialog_no");d={resizable:false,width:400,height:200,zIndex:3999,modal:true,dialogClass:"wp-dialog",buttons:[{text:c,click:function(){a.modal_yes();b(this).dialog("destroy");b(this).remove()}},{text:h,click:function(){b(this).dialog("close");b(this).dialog("destroy");b(this).remove()}}],close:function(i,j){setTimeout(function(){a.modal_cancel()},5)}};a.modal_markup.appendTo("body");a.modal_markup.dialog(d)};this.modal_yes=function(c){a.comment_content_clear();a.current_selection_clear();CommentPress.textselector.textblocks.highlighter_deactivate();CommentPress.textselector.textblocks.highlighter_activate();a.focus_clear();CommentPress.textselector.highlights_clear_all()};this.modal_cancel=function(c){a.focus_activate();CommentPress.textselector.selection_clear();CommentPress.textselector.textblocks.highlighter_disable()}};CommentPress.textselector.comments=new function(){var a=this,b=jQuery.noConflict();this.popover_comment="";if("undefined"!==typeof CommentpressTextSelectorSettings){this.popover_comment=CommentpressTextSelectorSettings.popover_comment}this.init=function(){};this.dom_ready=function(){};this.container="";this.container_set=function(c){this.container=c};this.container_get=function(){return this.container};this.setup=function(){a.setup_popover();a.setup_content();a.highlighter_activate()};this.setup_popover=function(){b(a.popover_comment).appendTo("body");b(".comment-popover-holder").mousedown(function(){return false});b(".comment-popover-holder-btn-left-quote").click(function(){var e,d,c;b(".comment-popover-holder").hide();a.selection_send_to_editor(true);CommentPress.common.comments.scroll_comments(b("#respond"),cp_scroll_speed);e=a.container_get();c=b("#"+e).wrapSelection({fitToWord:false}).addClass("inline-highlight");return false});b(".popover-holder-btn-right").click(function(){b(".comment-popover-holder").hide();var c="";a.container_set(c);return false})};this.setup_content=function(){b("#comments_sidebar").on("mousedown",".comment-content",function(){var c;c=b(this).parent().prop("id");a.container_set(c);a.highlighter_enable()});b("#comments_sidebar").on("mouseup",".comment-content",function(){var d,c;d=a.container_get();c=b(this).parent().prop("id");if(d!=c){a.container_set("");a.highlighter_disable()}else{}});b("#comments_sidebar").on("click",".comment-forwardlink",function(c){var j,g,i,f,d,k,h,e;c.preventDefault();g=b(this).prop("href").split("#")[1];j=b(this).parents("li.comment").map(function(){return this});if(j.length>0){i=b(j[0]);f=i.prop("id").split("-")[2];d=CommentPress.textselector.localisation_get("backlink_text");k='<a href="#comment-'+f+'" class="comment-backlink">'+d+"</a>";if(!b("#"+g+" .comment-identifier .comment-backlink").length){b(k).prependTo("#"+g+" .comment-identifier")}h=b(this).closest(".paragraph_wrapper").prop("id");e=b("#"+g).closest(".paragraph_wrapper").prop("id");if(h!=e){b("#"+e).show()}CommentPress.common.comments.scroll_comments(b("#"+g),300,"flash")}});b("#comments_sidebar").on("click",".comment-backlink",function(f){var d,c,e;f.preventDefault();d=b(this).prop("href").split("#")[1];c=b(this).closest(".paragraph_wrapper").prop("id");e=b("#"+d).closest(".paragraph_wrapper").prop("id");if(c!=e){b("#"+e).show()}CommentPress.common.comments.scroll_comments(b("#"+d),300,"flash");b(this).remove()})};this.selection_send_to_editor=function(c){var d;b(document).unbind("click",a.highlighter_comment_handler);d=CommentPress.textselector.selection_get(a.container_get());if(c){if(cp_tinymce=="1"){if(b("#wp-comment-wrap").hasClass("html-active")){a.selection_add_to_textarea(d.text)}else{a.selection_add_to_tinymce(d.text)}}else{a.selection_add_to_textarea(d.text)}}else{if(cp_tinymce=="1"){if(b("#wp-comment-wrap").hasClass("html-active")){setTimeout(function(){b("#comment").focus()},200)}else{setTimeout(function(){if("undefined"!==typeof tinymce.activeEditor){tinymce.activeEditor.focus()}else{b("#comment").focus()}},200)}}else{setTimeout(function(){b("#comment").focus()},200)}}};this.get_link=function(e){var c,d;c=a.container_get();d='<a href="#'+c+'" class="comment-forwardlink">'+e+"</a>";return d};this.selection_add_to_textarea=function(c){b("#comment").val(b("#comment").val()+a.get_link(c));setTimeout(function(){b("#comment").focus();a.highlights_clear_comment()},200)};this.selection_add_to_tinymce=function(c){tinymce.activeEditor.execCommand("mceInsertContent",false,a.get_link(c));setTimeout(function(){tinymce.activeEditor.focus();a.highlights_clear_comment()},200)};this.highlighter_activate=function(){b(".comment-content").highlighter({selector:".comment-popover-holder",minWords:1,complete:function(c){b(document).bind("click",a.highlighter_comment_handler)}})};this.highlighter_deactivate=function(){b(".comment-content").highlighter("destroy");b(document).unbind("click",a.highlighter_comment_handler)};this.highlighter_comment_handler=function(c){if(!b(c.target).closest(".comment-popover-holder").length){a.highlighter_deactivate();a.highlighter_activate()}};this.highlighter_enable=function(){b(".comment-content").highlighter("enable")};this.highlighter_disable=function(){b(".comment-content").highlighter("disable")};this.highlights_clear_comment=function(){b(".comment-content .inline-highlight").each(function(c){var d=b(this).contents();b(this).replaceWith(d)})}};CommentPress.textselector.init();jQuery(document).ready(function(a){CommentPress.textselector.dom_ready()});