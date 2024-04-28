package Hymn_Handlers;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class DbHandler {
    private static String database_name = "the_songs";
    private static int database_version = 1;

    private static String item_table = "enyimba";
    private static String key_item_id = "id";
    private static String key_item_name = "title";
    private static String key_item_body = "body";

    private Connection connection;

    public DbHandler() {
        // Initialize database connection
        try {
            connection = DriverManager.getConnection("jdbc:mysql://localhost/" + database_name, "username", "password");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void createTable() {
        try {
            Statement statement = connection.createStatement();
            String create_hymns_table = "CREATE TABLE IF NOT EXISTS " + item_table + "("
                    + key_item_id + " INTEGER PRIMARY KEY," + key_item_name + " TEXT,"
                    + key_item_body + " TEXT )";
            statement.executeUpdate(create_hymns_table);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<Song> getAllSongs(String item_name) {
        ArrayList<Song> gottenSongs = new ArrayList<>();
        try {
            String query1 = "SELECT * FROM " + item_table + " WHERE " + key_item_name + " LIKE '%" + item_name + "%'";
            PreparedStatement statement = connection.prepareStatement(query1);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                Song nu = new Song(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3));
                gottenSongs.add(nu);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return gottenSongs;
    }

    public Song getSongById(int id) {
        Song nu = null;
        try {
            String query1 = "SELECT * FROM " + item_table + " WHERE " + key_item_id + "=?";
            PreparedStatement statement = connection.prepareStatement(query1);
            statement.setInt(1, id);
            ResultSet resultSet = statement.executeQuery();

            if (resultSet.next()) {
                nu = new Song(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return nu;
    }

    public int doesSongExist() {
        int nu = 0;
        try {
            String query1 = "SELECT COUNT(*) FROM " + item_table;
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query1);
            if (resultSet.next()) {
                nu = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return nu;
    }

    public ArrayList<Song> getAllSongs() {
        ArrayList<Song> gottenSongs = new ArrayList<>();
        try {
            String query1 = "SELECT * FROM " + item_table;
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query1);

            while (resultSet.next()) {
                Song nu = new Song(resultSet.getInt(1), resultSet.getString(2), resultSet.getString(3));
                gottenSongs.add(nu);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return gottenSongs;
    }

    public void addContact(Song song) {
        try {
            String query = "INSERT INTO " + item_table + " (" + key_item_id + ", " + key_item_name + ", " + key_item_body + ") VALUES (?, ?, ?)";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setInt(1, song.getId());
            statement.setString(2, song.getSong_title());
            statement.setString(3, song.getSong_body());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public String getSong(String nu_name) {
        String vivian = null;
        try {
            String query1 = "SELECT " + key_item_body + " FROM " + item_table + " WHERE " + key_item_name + "=?";
            PreparedStatement statement = connection.prepareStatement(query1);
            statement.setString(1, nu_name);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                vivian = resultSet.getString(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vivian;
    }

    public void closeConnection() {
        try {
            if (connection != null) {
                connection.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

