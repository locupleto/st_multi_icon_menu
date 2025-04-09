from st_multi_icon_menu import st_multi_icon_menu
import streamlit as st

st.set_page_config(layout="wide")

st.title("Ant Menu Component Demo")
st.markdown("### Showcasing three icon types: Ant Design, FontAwesome, and Bootstrap")

keys = ["sub1", "sub2", "sub4", "g1", "g2", "3", "4", "5", "6", "9", "10", "11", "12", "13", "14", "grp"]
menu_data = [
    {
        "key": "sub1",
        "label": "Ant Design Icons",
        "icon": "ad-AppstoreOutlined",  # Ant Design icon with new prefix
        "children": [
            {
                "key": "g1",
                "label": "<b>Basic Icons</b>",
                "icon": "ad-HomeOutlined",  # Ant Design icon with new prefix
                "children": [
                    {"key": "1", "label": "Dashboard", "icon": "ad-DashboardOutlined"},  # Ant Design icon with new prefix
                    {"type": "divider"},
                    {"key": "2", "label": "User Profile", "icon": "ad-UserOutlined"},  # Ant Design icon with new prefix
                ],
                "type": "group",
            },
            {
                "key": "g2",
                "label": "Data Icons",
                "icon": "ad-DatabaseOutlined",  # Ant Design icon with new prefix
                "children": [
                    {"key": "3", "label": "Analytics", "icon": "ad-BarChartOutlined"},  # Ant Design icon with new prefix
                    {"key": "4", "label": "Reports", "icon": "ad-FileTextOutlined"},  # Ant Design icon with new prefix
                ],
                "type": "group",
            },
        ],
    },
    {
        "key": "sub2",
        "label": "FontAwesome Icons",
        "icon": "fa-sharp fa-regular fa-comments",  # FontAwesome icon (unchanged)
        "children": [
            {"key": "5", "label": "Ambulance", "icon": "fa-ambulance"},  # FontAwesome icon (unchanged)
            {"key": "6", "label": "Dolphin", "icon": "fa-sharp fa-light fa-dolphin"},  # FontAwesome icon (unchanged)
            {
                "key": "sub3",
                "label": "More Icons",
                "icon": "fa-sharp fa-light fa-circle-info",  # FontAwesome icon (unchanged)
                "children": [
                    {"key": "7", "label": "File Edit", "icon": "fa-sharp fa-light fa-file-pen"},  # FontAwesome icon (unchanged)
                    {"key": "8", "label": "Comments", "icon": "fa-sharp fa-regular fa-comments"},  # FontAwesome icon (unchanged)
                ],
            },
        ],
    },
    {"type": "divider"},
    {
        "key": "sub4",
        "label": "Bootstrap Icons",
        "icon": "bootstrap",  # Bootstrap icon (no prefix)
        "children": [
            {"key": "9", "label": "Dashboard", "icon": "speedometer2"},  # Bootstrap icon (no prefix)
            {"key": "10", "label": "Users", "icon": "people-fill"},  # Bootstrap icon (no prefix)
            {"key": "11", "label": "Settings", "icon": "gear"},  # Bootstrap icon (no prefix)
            {"key": "12", "label": "Security", "icon": "shield-lock"},  # Bootstrap icon (no prefix)
        ],
    },
    {
        "key": "grp",
        "label": "<b>Mixed Icons</b>",
        "icon": "stars",  # Bootstrap icon (no prefix)
        "children": [
            {"key": "13", "label": "Ant Design", "icon": "ad-BugOutlined"},  # Ant Design icon with new prefix
            {"key": "14", "label": "Bootstrap", "icon": "emoji-smile"},  # Bootstrap icon (no prefix)
            {"key": "15", "label": "FontAwesome", "icon": "fa-ambulance"},  # FontAwesome icon (unchanged)
        ],
        "type": "group",
    },
]

generall_css_styling = """
.ant-menu-item-divider {
    /* Add your custom styles for the divider here */
    border-top: 3px solid #1890ff !important;
    margin: 8px 0 !important;
}
"""

with st.sidebar:
    st.subheader("Menu Component")

    # Create tabs for theme selection
    theme_tab1, theme_tab2 = st.tabs(["Light Theme", "Dark Theme"])

    with theme_tab1:
        selected_key_light = st_multi_icon_menu(
            menu_data, 
            key="light_menu",
            generall_css_styling=generall_css_styling, 
            inlineIndent=24, 
            defaultOpenKeys=["sub1", "sub2", "sub4"],
            custom_font_awesome_url="https://kit.fontawesome.com/d115db5fb4.js",
            theme="light"
        )
        st.write(f"Selected: {selected_key_light}")

    with theme_tab2:
        selected_key_dark = st_multi_icon_menu(
            menu_data, 
            key="dark_menu",
            generall_css_styling=generall_css_styling, 
            inlineIndent=24, 
            defaultOpenKeys=["sub1", "sub2", "sub4"],
            custom_font_awesome_url="https://kit.fontawesome.com/d115db5fb4.js",
            theme="dark"
        )
        st.write(f"Selected: {selected_key_dark}")

# Main content area
st.header("Icon Types Demonstration")

col1, col2, col3 = st.columns(3)
with col1:
    st.subheader("Ant Design Icons")
    st.markdown("""
    Ant Design icons use the ad- prefix:
    ```python
    "icon": "ad-UserOutlined"
    "icon": "ad-AppstoreOutlined"
    "icon": "ad-DatabaseOutlined"
    ```
    """)

with col2:
    st.subheader("FontAwesome Icons")
    st.markdown("""
    FontAwesome icons use the fa- prefix:
    ```python
    "icon": "fa-ambulance"
    "icon": "fa-sharp fa-light fa-dolphin"
    "icon": "fa-sharp fa-regular fa-comments"
    ```
    """)

with col3:
    st.subheader("Bootstrap Icons")
    st.markdown("""
    Bootstrap icons are used directly by name:
    ```python
    "icon": "bootstrap"
    "icon": "speedometer2"
    "icon": "people-fill"
    ```
    """)
    
st.markdown("---")
st.markdown("""
### Documentation
For more information on available icons:
- [Ant Design Icons](https://ant.design/components/icon)
- [FontAwesome Icons](https://fontawesome.com/icons)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
""")